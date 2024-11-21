#include "glsl2hlsl.glsl"
#include "tonemapping.glsl"

#define MATERIAL_UNLIT
#define MATERIAL_IOR
#define MATERIAL_SPECULARGLOSSINESS
#define MATERIAL_METALLICROUGHNESS
#define MATERIAL_SHEEN
#define MATERIAL_CLEARCOAT
#define MATERIAL_SPECULAR
#define MATERIAL_TRANSMISSION
#define MATERIAL_VOLUME
#define HAS_OCCLUSION_MAP
#define HAS_EMISSIVE_MAP
#define USE_IBL
#define USE_PUNCTUAL

/* getBaseColor */
in_ vec2 v_texcoord_0;
in_ vec2 v_texcoord_1;
uniform int u_DiffuseUVSet;
uniform mat3 u_DiffuseUVTransform;
vec2 getDiffuseUV()
{
    vec3 uv = vec3(u_DiffuseUVSet < 1 ? v_texcoord_0 : v_texcoord_1, 1.0);
#ifdef HAS_DIFFUSE_UV_TRANSFORM
    uv = u_DiffuseUVTransform * uv;
#endif
	return uv.xy;
}

uniform int u_BaseColorUVSet;
uniform mat3 u_BaseColorUVTransform;
vec2 getBaseColorUV()
{
    vec3 uv = vec3(u_BaseColorUVSet < 1 ? v_texcoord_0 : v_texcoord_1, 1.0);
#ifdef HAS_BASECOLOR_UV_TRANSFORM
    uv = u_BaseColorUVTransform * uv;
#endif
	return uv.xy;
}

#ifdef HAS_COLOR_0_VEC3
in vec3 v_Color;
#endif
#ifdef HAS_COLOR_0_VEC4
in vec4 v_Color;
#endif
vec4 getVertexColor()
{
   vec4 color = vec4(1.0);
#ifdef HAS_COLOR_0_VEC3
    color.rgb = v_Color.rgb;
#endif
#ifdef HAS_COLOR_0_VEC4
    color = v_Color;
#endif
	return color;
}

uniform vec4 u_DiffuseFactor;
uniform vec4 u_BaseColorFactor;
uniform sampler2D u_DiffuseSampler;
uniform sampler2D u_BaseColorSampler;
vec4 getBaseColor()
{
    vec4 baseColor = vec4(1);
#if defined(MATERIAL_SPECULARGLOSSINESS)
    baseColor = u_DiffuseFactor;
#elif defined(MATERIAL_METALLICROUGHNESS)
    baseColor = u_BaseColorFactor;
#endif

#if defined(MATERIAL_SPECULARGLOSSINESS) && defined(HAS_DIFFUSE_MAP)
    baseColor *= texture(u_DiffuseSampler, getDiffuseUV());
#elif defined(MATERIAL_METALLICROUGHNESS) && defined(HAS_BASE_COLOR_MAP)
    baseColor *= texture(u_BaseColorSampler, getBaseColorUV());
#endif
    return baseColor * getVertexColor();
}

/* getNormalInfo */
vec2 getNormalUV()
{
    vec3 uv = vec3(u_NormalUVSet < 1 ? v_texcoord_0 : v_texcoord_1, 1.0);
#ifdef HAS_NORMAL_UV_TRANSFORM
    uv = u_NormalUVTransform * uv;
#endif
	return uv.xy;
}
struct NormalInfo
{
    vec3 ng; // World Geometry normal
    vec3 t;  // World Geometry tangent
    vec3 b;  // World Geometry bitangent
    vec3 n;  // World Shading normal
    vec3 ntex; // Normal from texture, scaling is accounted for.
};
NormalInfo getNormalInfo(vec3 v)
{
    vec2 UV = getNormalUV();
    
    /*
    https://learnopengl.com/Advanced-Lighting/Normal-Mapping
    |dP1| = |dU1 dV1| * |T|
    |dP2|   |dU2 dV2|   |B|
    =>
    |T| = | dV2 -dV1| * |dP1|
    |B|   |-dU2  dU1|   |dP2|  / (dU1*dV2 - dV1*dU2)
    */
    #if 0
    vec3 dUV1 = dFdx(vec3(UV, 0.0));
    vec3 dUV2 = dFdy(vec3(UV, 0.0));
    float dV1 = dUV1.t;
    float dV2 = dUV2.t;
    
    vec3 dP1 = dFdx(v_Position);
    vec3 dP2 = dFdy(v_Position);
    
    vec3 t_ = (dV2 * dP1 - dV1 * dP2)  / (dU1 * dV2 - dV1 * dU2);
    // t_为从UV空间到世界空间转换矩阵基的X分量
    #else
    vec3 uv_dx = dFdx(vec3(UV, 0.0));
    vec3 uv_dy = dFdy(vec3(UV, 0.0));
    
    vec3 t_ = (uv_dy.t * dFdx(v_Position) - uv_dx.t * dFdy(v_Position)) / (uv_dx.s * uv_dy.t - uv_dy.s * uv_dx.t);
    #endif
       
    vec3 n, t, b, ng;
    // Compute geometrical TBN:
#ifdef HAS_NORMAL_VEC3
    #ifdef HAS_TANGENT_VEC4
        // Trivial TBN computation, present as vertex attribute.
        // Normalize eigenvectors as matrix is linearly interpolated.
        t  = normalize(v_TBN[0]);
        b  = normalize(v_TBN[1]);
        ng = normalize(v_TBN[2]);
    #else
        // Normals are either present as vertex attributes or approximated.
        ng = normalize(v_Normal);
        t  = normalize(t_ - ng * dot(ng, t_));
        b  = cross(ng, t);
    #endif
#else
	ng = normalize(cross(dFdx(v_Position), dFdy(v_Position)));// 世界坐标法线
	t = normalize(t_ - ng * dot(ng, t_));
	b = cross(ng, t);
#endif

    // For a back-facing surface, the tangential basis vectors are negated.
	if (gl_FrontFacing == false)
	{
		t *= -1.0;
		b *= -1.0;
		ng *= -1.0;
	}

    // Compute normals:
	NormalInfo info;
	info.ng = ng;
#ifdef HAS_NORMAL_MAP
    info.ntex  = texture(u_NormalSampler, UV).rgb * 2.0 - vec3(1.0);
    info.ntex *= vec3(u_NormalScale, u_NormalScale, 1.0);
    info.ntex  = normalize(info.ntex);
    info.n = normalize(mat3(t, b, ng) * info.ntex);
#else
	info.n = ng;
#endif
	info.t = t;
	info.b = b;
	return info;
}

/* MaterialInfo */
struct MaterialInfo
{
	float ior;
	float perceptualRoughness; // roughness value, as authored by the model creator (input to shader)
    vec3 f0; // full reflectance color (n incidence angle)

	float alphaRoughness; // roughness mapped to a more linear change in the roughness (proposed by [2])
    vec3 c_diff;

    vec3 f90; // reflectance color at grazing angle
	float metallic;

    vec3 baseColor;

	float sheenRoughnessFactor;
    vec3 sheenColorFactor;

    vec3 clearcoatF0;
    vec3 clearcoatF90;
	float clearcoatFactor;
    vec3 clearcoatNormal;
	float clearcoatRoughness;

    // KHR_materials_specular 
	float specularWeight; // product of specularFactor and specularTexture.a

	float transmissionFactor;

	float thickness;
    vec3 attenuationColor;
	float attenuationDistance;
};
#ifdef MATERIAL_IOR
MaterialInfo getIorInfo(MaterialInfo info)
{
	info.f0 = vec3(pow((u_Ior - 1.0) / (u_Ior + 1.0), 2.0));
	info.ior = u_Ior;
	return info;
}
#endif
#ifdef MATERIAL_SPECULARGLOSSINESS
MaterialInfo getSpecularGlossinessInfo(MaterialInfo info)
{
    info.f0 = u_SpecularFactor;
    info.perceptualRoughness = u_GlossinessFactor;
#ifdef HAS_SPECULAR_GLOSSINESS_MAP
    vec4 sgSample = texture(u_SpecularGlossinessSampler, getSpecularGlossinessUV());
    info.perceptualRoughness *= sgSample.a ; // glossiness to roughness
    info.f0 *= sgSample.rgb; // specular
#endif // ! HAS_SPECULAR_GLOSSINESS_MAP
    info.perceptualRoughness = 1.0 - info.perceptualRoughness; // 1 - glossiness
    info.c_diff = info.baseColor.rgb * (1.0 - max(max(info.f0.r, info.f0.g), info.f0.b));
    return info;
}
#endif
#ifdef MATERIAL_METALLICROUGHNESS
MaterialInfo getMetallicRoughnessInfo(MaterialInfo info)
{
    info.metallic = u_MetallicFactor;
    info.perceptualRoughness = u_RoughnessFactor;
#ifdef HAS_METALLIC_ROUGHNESS_MAP
    // Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
    // This layout intentionally reserves the 'r' channel for (optional) occlusion map data
    vec4 mrSample = texture(u_MetallicRoughnessSampler, getMetallicRoughnessUV());
    info.perceptualRoughness *= mrSample.g;
    info.metallic *= mrSample.b;
#endif
    // Achromatic f0 based on IOR.
	info.c_diff = mix(info.baseColor.rgb, vec3(0), info.metallic);
	info.f0 = mix(info.f0, info.baseColor.rgb, info.metallic);
    return info;
}
#endif
#ifdef MATERIAL_SHEEN
MaterialInfo getSheenInfo(MaterialInfo info)
{
    info.sheenColorFactor = u_SheenColorFactor;
    info.sheenRoughnessFactor = u_SheenRoughnessFactor;
#ifdef HAS_SHEEN_COLOR_MAP
    vec4 sheenColorSample = texture(u_SheenColorSampler, getSheenColorUV());
    info.sheenColorFactor *= sheenColorSample.rgb;
#endif
#ifdef HAS_SHEEN_ROUGHNESS_MAP
    vec4 sheenRoughnessSample = texture(u_SheenRoughnessSampler, getSheenRoughnessUV());
    info.sheenRoughnessFactor *= sheenRoughnessSample.a;
#endif
    return info;
}
#endif
#ifdef MATERIAL_CLEARCOAT
MaterialInfo getClearCoatInfo(MaterialInfo info, NormalInfo normalInfo)
{
	info.clearcoatFactor = u_ClearcoatFactor;
	info.clearcoatRoughness = u_ClearcoatRoughnessFactor;
	info.clearcoatF0 = vec3(info.f0);
	info.clearcoatF90 = vec3(1.0);
#ifdef HAS_CLEARCOAT_MAP
    vec4 clearcoatSample = texture(u_ClearcoatSampler, getClearcoatUV());
    info.clearcoatFactor *= clearcoatSample.r;
#endif
#ifdef HAS_CLEARCOAT_ROUGHNESS_MAP
    vec4 clearcoatSampleRoughness = texture(u_ClearcoatRoughnessSampler, getClearcoatRoughnessUV());
    info.clearcoatRoughness *= clearcoatSampleRoughness.g;
#endif
	info.clearcoatNormal = getClearcoatNormal(normalInfo);
	info.clearcoatRoughness = clamp(info.clearcoatRoughness, 0.0, 1.0);
	return info;
}
#endif
#ifdef MATERIAL_SPECULAR
MaterialInfo getSpecularInfo(MaterialInfo info)
{
    vec4 specularTexture = vec4(1.0);
#ifdef HAS_SPECULAR_MAP
    specularTexture.a = texture(u_SpecularSampler, getSpecularUV()).a;
#endif
#ifdef HAS_SPECULAR_COLOR_MAP
    specularTexture.rgb = texture(u_SpecularColorSampler, getSpecularColorUV()).rgb;
#endif
    vec3 dielectricSpecularF0 = min(info.f0 * u_KHR_materials_specular_specularColorFactor * specularTexture.rgb, vec3(1.0));
	info.f0 = mix(dielectricSpecularF0, info.baseColor.rgb, info.metallic);
	info.specularWeight = u_KHR_materials_specular_specularFactor * specularTexture.a;
	info.c_diff = mix(info.baseColor.rgb, vec3(0), info.metallic);
	return info;
}
#endif
#ifdef MATERIAL_TRANSMISSION
MaterialInfo getTransmissionInfo(MaterialInfo info)
{
	info.transmissionFactor = u_TransmissionFactor;
#ifdef HAS_TRANSMISSION_MAP
    vec4 transmissionSample = texture(u_TransmissionSampler, getTransmissionUV());
    info.transmissionFactor *= transmissionSample.r;
#endif
	return info;
}
#endif
#ifdef MATERIAL_VOLUME
MaterialInfo getVolumeInfo(MaterialInfo info)
{
	info.thickness = u_ThicknessFactor;
	info.attenuationColor = u_AttenuationColor;
	info.attenuationDistance = u_AttenuationDistance;
#ifdef HAS_THICKNESS_MAP
    vec4 thicknessSample = texture(u_ThicknessSampler, getThicknessUV());
    info.thickness *= thicknessSample.g;
#endif
	return info;
}
#endif

/* IBL */
vec4 getSpecularSample(vec3 reflection, float lod)
{
	return textureLod(u_GGXEnvSampler, u_EnvRotation * reflection, lod);
}
vec3 getIBLRadianceGGX(vec3 n, vec3 v, float roughness, vec3 F0, float specularWeight)
{
	float NdotV = clampedDot(n, v);
	float lod = roughness * float(u_MipCount - 1);
    vec3 reflection = normalize(reflect(-v, n));

    vec2 brdfSamplePoint = clamp(vec2(NdotV, roughness), vec2(0.0, 0.0), vec2(1.0, 1.0));
    vec2 f_ab = texture(u_GGXLUT, brdfSamplePoint).rg;
    vec4 specularSample = getSpecularSample(reflection, lod);

    vec3 specularLight = specularSample.rgb;

    // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
    // Roughness dependent fresnel, from Fdez-Aguera
    vec3 Fr = max(vec3(1.0 - roughness), F0) - F0;
    vec3 k_S = F0 + Fr * pow(1.0 - NdotV, 5.0);
    vec3 FssEss = k_S * f_ab.x + f_ab.y;
	return specularWeight * specularLight * FssEss;
}
// specularWeight is introduced with KHR_materials_specular
vec3 getDiffuseLight(vec3 n)
{
	return texture(u_LambertianEnvSampler, u_EnvRotation * n).rgb;
}
vec3 getIBLRadianceLambertian(vec3 n, vec3 v, float roughness, vec3 diffuseColor, vec3 F0, float specularWeight)
{
	float NdotV = clampedDot(n, v);
    vec2 brdfSamplePoint = clamp(vec2(NdotV, roughness), vec2(0.0, 0.0), vec2(1.0, 1.0));
    vec2 f_ab = texture(u_GGXLUT, brdfSamplePoint).rg;

    vec3 irradiance = getDiffuseLight(n);

    // see https://bruop.github.io/ibl/#single_scattering_results at Single Scattering Results
    // Roughness dependent fresnel, from Fdez-Aguera
    vec3 Fr = max(vec3(1.0 - roughness), F0) - F0;
    vec3 k_S = F0 + Fr * pow(1.0 - NdotV, 5.0);
    vec3 FssEss = specularWeight * k_S * f_ab.x + f_ab.y; // <--- GGX / specular light contribution (scale it down if the specularWeight is low)

    // Multiple scattering, from Fdez-Aguera
	float Ems = (1.0 - (f_ab.x + f_ab.y));
    vec3 F_avg = specularWeight * (F0 + (1.0 - F0) / 21.0);
    vec3 FmsEms = Ems * FssEss * F_avg / (1.0 - F_avg * Ems);
    vec3 k_D = diffuseColor * (1.0 - FssEss + FmsEms); // we use +FmsEms as indicated by the formula in the blog post (might be a typo in the implementation)
	return (FmsEms + k_D) * irradiance;
}
vec4 getSheenSample(vec3 reflection, float lod)
{
	return textureLod(u_CharlieEnvSampler, u_EnvRotation * reflection, lod);
}
vec3 getIBLRadianceCharlie(vec3 n, vec3 v, float sheenRoughness, vec3 sheenColor)
{
	float NdotV = clampedDot(n, v);
	float lod = sheenRoughness * float(u_MipCount - 1);
    vec3 reflection = normalize(reflect(-v, n));

    vec2 brdfSamplePoint = clamp(vec2(NdotV, sheenRoughness), vec2(0.0, 0.0), vec2(1.0, 1.0));
	float brdf = texture(u_CharlieLUT, brdfSamplePoint).b;
    vec4 sheenSample = getSheenSample(reflection, lod);

    vec3 sheenLight = sheenSample.rgb;
	return sheenLight * sheenColor * brdf;
}

/* Volume Refraction */
#ifdef MATERIAL_TRANSMISSION
vec3 getVolumeTransmissionRay(vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix)
{
    // Direction of refracted light.
    vec3 refractionVector = refract(-v, normalize(n), 1.0 / ior);

    // Compute rotation-independant scaling of the model matrix.
    vec3 modelScale;
	modelScale.x = length(vec3(modelMatrix[0].xyz));
	modelScale.y = length(vec3(modelMatrix[1].xyz));
	modelScale.z = length(vec3(modelMatrix[2].xyz));

    // The thickness is specified in local space.
	return normalize(refractionVector) * thickness * modelScale;
}
vec3 getTransmissionSample(vec2 fragCoord, float roughness, float ior)
{
	float framebufferLod = log2(float(u_TransmissionFramebufferSize.x)) * applyIorToRoughness(roughness, ior);
    vec3 transmittedLight = textureLod(u_TransmissionFramebufferSampler, fragCoord.xy, framebufferLod).rgb;
	return transmittedLight;
}
// Compute attenuated light as it travels through a volume.
vec3 applyVolumeAttenuation(vec3 radiance, float transmissionDistance, vec3 attenuationColor, float attenuationDistance)
{
	if (attenuationDistance == 0.0)
	{
        // Attenuation distance is +∞ (which we indicate by zero), i.e. the transmitted color is not attenuated at all.
		return radiance;
	}
	else
	{
        // Compute light attenuation using Beer's law.
        vec3 attenuationCoefficient = -log(attenuationColor) / attenuationDistance;
        vec3 transmittance = exp(-attenuationCoefficient * transmissionDistance); // Beer's law
		return transmittance * radiance;
	}
}
vec3 getIBLVolumeRefraction(vec3 n, vec3 v, float perceptualRoughness, vec3 baseColor, vec3 f0, vec3 f90,
    vec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness, vec3 attenuationColor, float attenuationDistance)
{
    vec3 transmissionRay = getVolumeTransmissionRay(n, v, thickness, ior, modelMatrix);
    vec3 refractedRayExit = position + transmissionRay;

    // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
    vec4 ndcPos = projMatrix * viewMatrix * vec4(refractedRayExit, 1.0);
    vec2 refractionCoords = ndcPos.xy / ndcPos.w;
	refractionCoords += 1.0;
	refractionCoords /= 2.0;

    // Sample framebuffer to get pixel the refracted ray hits.
    vec3 transmittedLight = getTransmissionSample(refractionCoords, perceptualRoughness, ior);
    vec3 attenuatedColor = applyVolumeAttenuation(transmittedLight, length(transmissionRay), attenuationColor, attenuationDistance);

    // Sample GGX LUT to get the specular component.
	float NdotV = clampedDot(n, v);
    vec2 brdfSamplePoint = clamp(vec2(NdotV, perceptualRoughness), vec2(0.0, 0.0), vec2(1.0, 1.0));
    vec2 brdf = texture(u_GGXLUT, brdfSamplePoint).rg;
    vec3 specularColor = f0 * brdf.x + f90 * brdf.y;
	return (1.0 - specularColor) * attenuatedColor * baseColor;
}
#endif

/* PUNCTUAL */
struct Light
{
    vec3 direction;
	float range;

    vec3 color;
	float intensity;

    vec3 position;
	float innerConeCos;

	float outerConeCos;
	int type;
};
// https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md#range-property
float getRangeAttenuation(float range, float distance)
{
	if (range <= 0.0)
	{
        // negative range means unlimited
		return 1.0 / pow(distance, 2.0);
	}
	return max(min(1.0 - pow(distance / range, 4.0), 1.0), 0.0) / pow(distance, 2.0);
}
// https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md#inner-and-outer-cone-angles
float getSpotAttenuation(vec3 pointToLight, vec3 spotDirection, float outerConeCos, float innerConeCos)
{
	float actualCos = dot(normalize(spotDirection), normalize(-pointToLight));
	if (actualCos > outerConeCos)
	{
		if (actualCos < innerConeCos)
		{
			return smoothstep(outerConeCos, innerConeCos, actualCos);
		}
		return 1.0;
	}
	return 0.0;
}
vec3 getLighIntensity(Light light, vec3 pointToLight)
{
	float rangeAttenuation = 1.0;
	float spotAttenuation = 1.0;
	if (light.type != LightType_Directional)
	{
		rangeAttenuation = getRangeAttenuation(light.range, length(pointToLight));
	}
	if (light.type == LightType_Spot)
	{
		spotAttenuation = getSpotAttenuation(pointToLight, light.direction, light.outerConeCos, light.innerConeCos);
	}
	return rangeAttenuation * spotAttenuation * light.intensity * light.color;
}
// The following equation models the Fresnel reflectance term of the spec equation (aka F())
// Implementation of fresnel from [4], Equation 15
vec3 F_Schlick(vec3 f0, vec3 f90, float VdotH)
{
	return f0 + (f90 - f0) * pow(clamp(1.0 - VdotH, 0.0, 1.0), 5.0);
}
//https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
vec3 BRDF_lambertian(vec3 f0, vec3 f90, vec3 diffuseColor, float specularWeight, float VdotH)
{
    // see https://seblagarde.wordpress.com/2012/01/08/pi-or-not-to-pi-in-game-lighting-equation/
	return (1.0 - specularWeight * F_Schlick(f0, f90, VdotH)) * (diffuseColor / M_PI);
}
// Smith Joint GGX
// Note: Vis = G / (4 * NdotL * NdotV)
// see Eric Heitz. 2014. Understanding the Masking-Shadowing Function in Microfacet-Based BRDFs. Journal of Computer Graphics Techniques, 3
// see Real-Time Rendering. Page 331 to 336.
// see https://google.github.io/filament/Filament.md.html#materialsystem/specularbrdf/geometricshadowing(specularg)
float V_GGX(float NdotL, float NdotV, float alphaRoughness)
{
	float alphaRoughnessSq = alphaRoughness * alphaRoughness;

	float GGXV = NdotL * sqrt(NdotV * NdotV * (1.0 - alphaRoughnessSq) + alphaRoughnessSq);
	float GGXL = NdotV * sqrt(NdotL * NdotL * (1.0 - alphaRoughnessSq) + alphaRoughnessSq);

	float GGX = GGXV + GGXL;
	if (GGX > 0.0)
	{
		return 0.5 / GGX;
	}
	return 0.0;
}
// The following equation(s) model the distribution of microfacet normals across the area being drawn (aka D())
// Implementation from "Average Irregularity Representation of a Roughened Surface for Ray Reflection" by T. S. Trowbridge, and K. P. Reitz
// Follows the distribution function recommended in the SIGGRAPH 2013 course notes from EPIC Games [1], Equation 3.
float D_GGX(float NdotH, float alphaRoughness)
{
	float alphaRoughnessSq = alphaRoughness * alphaRoughness;
	float f = (NdotH * NdotH) * (alphaRoughnessSq - 1.0) + 1.0;
	return alphaRoughnessSq / (M_PI * f * f);
}
//  https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
vec3 BRDF_specularGGX(vec3 f0, vec3 f90, float alphaRoughness, float specularWeight, float VdotH, float NdotL, float NdotV, float NdotH)
{
    vec3 F = F_Schlick(f0, f90, VdotH);
	float Vis = V_GGX(NdotL, NdotV, alphaRoughness);
	float D = D_GGX(NdotH, alphaRoughness);
	return specularWeight * F * Vis * D;
}
// Estevez and Kulla http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
float D_Charlie(float sheenRoughness, float NdotH)
{
	sheenRoughness = max(sheenRoughness, 0.000001); //clamp (0,1]
	float alphaG = sheenRoughness * sheenRoughness;
	float invR = 1.0 / alphaG;
	float cos2h = NdotH * NdotH;
	float sin2h = 1.0 - cos2h;
	return (2.0 + invR) * pow(sin2h, invR * 0.5) / (2.0 * M_PI);
}
float lambdaSheenNumericHelper(float x, float alphaG)
{
	float oneMinusAlphaSq = (1.0 - alphaG) * (1.0 - alphaG);
	float a = mix(21.5473, 25.3245, oneMinusAlphaSq);
	float b = mix(3.82987, 3.32435, oneMinusAlphaSq);
	float c = mix(0.19823, 0.16801, oneMinusAlphaSq);
	float d = mix(-1.97760, -1.27393, oneMinusAlphaSq);
	float e = mix(-4.32054, -4.85967, oneMinusAlphaSq);
	return a / (1.0 + b * pow(x, c)) + d * x + e;
}
float lambdaSheen(float cosTheta, float alphaG)
{
	if (abs(cosTheta) < 0.5)
	{
		return exp(lambdaSheenNumericHelper(cosTheta, alphaG));
	}
	else
	{
		return exp(2.0 * lambdaSheenNumericHelper(0.5, alphaG) - lambdaSheenNumericHelper(1.0 - cosTheta, alphaG));
	}
}
float V_Sheen(float NdotL, float NdotV, float sheenRoughness)
{
	sheenRoughness = max(sheenRoughness, 0.000001); //clamp (0,1]
	float alphaG = sheenRoughness * sheenRoughness;
	return clamp(1.0 / ((1.0 + lambdaSheen(NdotV, alphaG) + lambdaSheen(NdotL, alphaG)) * (4.0 * NdotV * NdotL)), 0.0, 1.0);
}
// f_sheen
vec3 BRDF_specularSheen(vec3 sheenColor, float sheenRoughness, float NdotL, float NdotV, float NdotH)
{
	float sheenDistribution = D_Charlie(sheenRoughness, NdotH);
	float sheenVisibility = V_Sheen(NdotL, NdotV, sheenRoughness);
	return sheenColor * sheenDistribution * sheenVisibility;
}
vec3 getPunctualRadianceSheen(vec3 sheenColor, float sheenRoughness, float NdotL, float NdotV, float NdotH)
{
	return NdotL * BRDF_specularSheen(sheenColor, sheenRoughness, NdotL, NdotV, NdotH);
}
float albedoSheenScalingLUT(float NdotV, float sheenRoughnessFactor)
{
	return texture(u_SheenELUT, vec2(NdotV, sheenRoughnessFactor)).r;
}
vec3 getPunctualRadianceClearCoat(vec3 clearcoatNormal, vec3 v, vec3 l, vec3 h, float VdotH, vec3 f0, vec3 f90, float clearcoatRoughness)
{
	float NdotL = clampedDot(clearcoatNormal, l);
	float NdotV = clampedDot(clearcoatNormal, v);
	float NdotH = clampedDot(clearcoatNormal, h);
	return NdotL * BRDF_specularGGX(f0, f90, clearcoatRoughness * clearcoatRoughness, 1.0, VdotH, NdotL, NdotV, NdotH);
}
float applyIorToRoughness(float roughness, float ior)
{
    // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
    // an IOR of 1.5 results in the default amount of microfacet refraction.
	return roughness * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
}
vec3 getPunctualRadianceTransmission(vec3 normal, vec3 view, vec3 pointToLight, float alphaRoughness, vec3 f0, vec3 f90, vec3 baseColor, float ior)
{
	float transmissionRougness = applyIorToRoughness(alphaRoughness, ior);

    vec3 n = normalize(normal); // Outward direction of surface point
    vec3 v = normalize(view); // Direction from surface point to view
    vec3 l = normalize(pointToLight);
    vec3 l_mirror = normalize(l + 2.0 * n * dot(-l, n)); // Mirror light reflection vector on surface
    vec3 h = normalize(l_mirror + v); // Halfway vector between transmission light vector and v

	float D = D_GGX(clamp(dot(n, h), 0.0, 1.0), transmissionRougness);
    vec3 F = F_Schlick(f0, f90, clamp(dot(v, h), 0.0, 1.0));
	float Vis = V_GGX(clamp(dot(n, l_mirror), 0.0, 1.0), clamp(dot(n, v), 0.0, 1.0), transmissionRougness);
    // Transmission BTDF
	return (1.0 - F) * baseColor * D * Vis;
}

uniform float u_AlphaCutoff;
out_ vec4 g_finalColor;
void main()
{
    vec4 baseColor = getBaseColor();
#if ALPHAMODE == ALPHAMODE_OPAQUE
	baseColor.a = 1.0;
#endif
    
    // 无光材质
#ifdef MATERIAL_UNLIT
    #if ALPHAMODE == ALPHAMODE_MASK
        if (baseColor.a < u_AlphaCutoff) 
            discard;
    #endif
    g_finalColor = (vec4(linearTosRGB(baseColor.rgb), baseColor.a));
    return;
#endif

	vec3 v = normalize(u_Camera - v_Position);
	NormalInfo normalInfo = getNormalInfo(v);
	vec3 n = normalInfo.n;
	vec3 t = normalInfo.t;
	vec3 b = normalInfo.b;

	float NdotV = clampedDot(n, v);
	float TdotV = clampedDot(t, v);
	float BdotV = clampedDot(b, v);
    
	MaterialInfo materialInfo;
	materialInfo.baseColor = baseColor.rgb;
	materialInfo.ior = 1.5;
	materialInfo.f0  = vec3(0.04);
	materialInfo.specularWeight = 1.0;
#ifdef MATERIAL_IOR
    materialInfo = getIorInfo(materialInfo);
#endif
#ifdef MATERIAL_SPECULARGLOSSINESS
    materialInfo = getSpecularGlossinessInfo(materialInfo);
#endif
#ifdef MATERIAL_METALLICROUGHNESS
    materialInfo = getMetallicRoughnessInfo(materialInfo);
#endif
#ifdef MATERIAL_SHEEN
	materialInfo = getSheenInfo(materialInfo);
#endif
#ifdef MATERIAL_CLEARCOAT
    materialInfo = getClearCoatInfo(materialInfo, normalInfo);
#endif
#ifdef MATERIAL_SPECULAR
    materialInfo = getSpecularInfo(materialInfo);
#endif
#ifdef MATERIAL_TRANSMISSION
    materialInfo = getTransmissionInfo(materialInfo);
#endif
#ifdef MATERIAL_VOLUME
    materialInfo = getVolumeInfo(materialInfo);
#endif
	materialInfo.perceptualRoughness = clamp(materialInfo.perceptualRoughness, 0.0, 1.0);
	materialInfo.metallic = clamp(materialInfo.metallic, 0.0, 1.0);
    // Roughness is authored as perceptual roughness; as is convention,
    // convert to material roughness by squaring the perceptual roughness.
	materialInfo.alphaRoughness = materialInfo.perceptualRoughness * materialInfo.perceptualRoughness;
    
    // Compute reflectance.
	float reflectance = max(max(materialInfo.f0.r, materialInfo.f0.g), materialInfo.f0.b);
    // Anything less than 2% is physically impossible and is instead considered to be shadowing. Compare to "Real-Time-Rendering" 4th editon on page 325.
	materialInfo.f90 = vec3(1.0);
    
    // LIGHTING
    vec3 f_specular = vec3(0.0);
    vec3 f_diffuse = vec3(0.0);
    vec3 f_clearcoat = vec3(0.0);
    vec3 f_sheen = vec3(0.0);
#ifdef USE_IBL
    f_specular += getIBLRadianceGGX(n, v, materialInfo.perceptualRoughness, materialInfo.f0, materialInfo.specularWeight);
    f_diffuse += getIBLRadianceLambertian(n, v, materialInfo.perceptualRoughness, materialInfo.c_diff, materialInfo.f0, materialInfo.specularWeight);
    #ifdef MATERIAL_CLEARCOAT
        f_clearcoat += getIBLRadianceGGX(materialInfo.clearcoatNormal, v, materialInfo.clearcoatRoughness, materialInfo.clearcoatF0, 1.0);
    #endif
    #ifdef MATERIAL_SHEEN
        f_sheen += getIBLRadianceCharlie(n, v, materialInfo.sheenRoughnessFactor, materialInfo.sheenColorFactor);
    #endif
#endif

    vec3 f_transmission = vec3(0.0);
#if (defined(MATERIAL_TRANSMISSION) || defined(MATERIAL_VOLUME)) && (defined(USE_PUNCTUAL) || defined(USE_IBL))
    f_transmission += materialInfo.transmissionFactor * getIBLVolumeRefraction(
        n, v,
        materialInfo.perceptualRoughness,
        materialInfo.baseColor, materialInfo.f0, materialInfo.f90,
        v_Position, u_ModelMatrix, u_ViewMatrix, u_ProjectionMatrix,
        materialInfo.ior, materialInfo.thickness, materialInfo.attenuationColor, materialInfo.attenuationDistance);
#endif

    // Apply optional PBR terms for additional (optional) shading
	float ao = 1.0;
#ifdef HAS_OCCLUSION_MAP
    ao = texture(u_OcclusionSampler,  getOcclusionUV()).r;
    f_diffuse = mix(f_diffuse, f_diffuse * ao, u_OcclusionStrength);
    // apply ambient occlusion to all lighting that is not punctual
    f_specular = mix(f_specular, f_specular * ao, u_OcclusionStrength);
    f_sheen = mix(f_sheen, f_sheen * ao, u_OcclusionStrength);
    f_clearcoat = mix(f_clearcoat, f_clearcoat * ao, u_OcclusionStrength);
#endif

	float albedoSheenScaling = 1.0;
#ifdef USE_PUNCTUAL
    for (int i = 0; i < min(LIGHT_COUNT, 1); ++i)
    {
        Light light = u_Lights[i];

        vec3 pointToLight;
        if (light.type != LightType_Directional)
        {
            pointToLight = light.position - v_Position;
        }
        else
        {
            pointToLight = -light.direction;
        }

        // BSTF
        vec3 l = normalize(pointToLight);   // Direction from surface point to light
        vec3 h = normalize(l + v);          // Direction of the vector between l and v, called halfway vector
        float NdotL = clampedDot(n, l);
        float NdotV = clampedDot(n, v);
        float NdotH = clampedDot(n, h);
        float LdotH = clampedDot(l, h);
        float VdotH = clampedDot(v, h);
        if (NdotL > 0.0 || NdotV > 0.0)
        {
            // Calculation of analytical light
            // https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#acknowledgments AppendixB
            vec3 intensity = getLighIntensity(light, pointToLight);
            f_diffuse += intensity * NdotL *  BRDF_lambertian(materialInfo.f0, materialInfo.f90, materialInfo.c_diff, materialInfo.specularWeight, VdotH);
            f_specular += intensity * NdotL * BRDF_specularGGX(materialInfo.f0, materialInfo.f90, materialInfo.alphaRoughness, materialInfo.specularWeight, VdotH, NdotL, NdotV, NdotH);
        #ifdef MATERIAL_SHEEN
            f_sheen += intensity * getPunctualRadianceSheen(materialInfo.sheenColorFactor, materialInfo.sheenRoughnessFactor, NdotL, NdotV, NdotH);
            albedoSheenScaling = min(1.0 - max3(materialInfo.sheenColorFactor) * albedoSheenScalingLUT(NdotV, materialInfo.sheenRoughnessFactor),
                                     1.0 - max3(materialInfo.sheenColorFactor) * albedoSheenScalingLUT(NdotL, materialInfo.sheenRoughnessFactor));
        #endif
        #ifdef MATERIAL_CLEARCOAT
            f_clearcoat += intensity * getPunctualRadianceClearCoat(materialInfo.clearcoatNormal, v, l, h, VdotH,
                                                                    materialInfo.clearcoatF0, materialInfo.clearcoatF90, materialInfo.clearcoatRoughness);
        #endif
        }

        // BDTF
    #ifdef MATERIAL_TRANSMISSION
        // If the light ray travels through the geometry, use the point it exits the geometry again.
        // That will change the angle to the light source, if the material refracts the light ray.
        vec3 transmissionRay = getVolumeTransmissionRay(n, v, materialInfo.thickness, materialInfo.ior, u_ModelMatrix);
        pointToLight -= transmissionRay;
        l = normalize(pointToLight);

        vec3 intensity = getLighIntensity(light, pointToLight);
        vec3 transmittedLight = intensity * getPunctualRadianceTransmission(n, v, l, materialInfo.alphaRoughness, materialInfo.f0, materialInfo.f90, materialInfo.baseColor, materialInfo.ior);
        #ifdef MATERIAL_VOLUME
            transmittedLight = applyVolumeAttenuation(transmittedLight, length(transmissionRay), materialInfo.attenuationColor, materialInfo.attenuationDistance);
        #endif
        f_transmission += materialInfo.transmissionFactor * transmittedLight;
    #endif
    }
#endif

	vec3 f_emissive = u_EmissiveFactor;
#ifdef HAS_EMISSIVE_MAP
    f_emissive *= texture(u_EmissiveSampler, getEmissiveUV()).rgb;
#endif

	float clearcoatFactor = 0.0;
    vec3 clearcoatFresnel = vec3(0);
#ifdef MATERIAL_CLEARCOAT
	clearcoatFactor = materialInfo.clearcoatFactor;
	clearcoatFresnel = F_Schlick(materialInfo.clearcoatF0, materialInfo.clearcoatF90, clampedDot(materialInfo.clearcoatNormal, v));
	f_clearcoat = f_clearcoat * clearcoatFactor;
#endif
    
#ifdef MATERIAL_TRANSMISSION
    vec3 diffuse = mix(f_diffuse, f_transmission, materialInfo.transmissionFactor);
#else
    vec3 diffuse = f_diffuse;
#endif
    
	vec3 color = f_emissive + diffuse + f_specular;
	color = f_sheen + color * albedoSheenScaling;
	color = color * (1.0 - clearcoatFactor * clearcoatFresnel) + f_clearcoat;
    
#if ALPHAMODE == ALPHAMODE_MASK
    // Late discard to avoid samplig artifacts. See https://github.com/KhronosGroup/glTF-Sample-Viewer/issues/267
	if (baseColor.a < u_AlphaCutoff) 
        discard;
	baseColor.a = 1.0;
#endif

#ifdef LINEAR_OUTPUT
    g_finalColor = vec4(color.rgb, baseColor.a);
#else
	g_finalColor = vec4(toneMap(color), baseColor.a);
#endif
}