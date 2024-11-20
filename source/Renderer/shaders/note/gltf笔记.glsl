#include "glsl2hlsl.glsl"
#include "tonemapping.glsl"

#define MATERIAL_UNLIT

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
    vec3 ng; // Geometry normal
    vec3 t; // Geometry tangent
    vec3 b; // Geometry bitangent
    vec3 n; // Shading normal
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
    
    vec3 t_ = (dV2 * dP1 - dV1 * dP2)  / (dU1 * dV2 - dV1 * dU2)
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
	ng = normalize(cross(dFdx(v_Position), dFdy(v_Position)));
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

uniform float u_AlphaCutoff;
out_ vec4 g_finalColor;
void main()
{
    vec4 baseColor = getBaseColor();
#if ALPHAMODE == ALPHAMODE_OPAQUE
	baseColor.a = 1.0;
#endif
    
    // ÎÞ¹â²ÄÖÊ
#ifdef MATERIAL_UNLIT
    #if ALPHAMODE == ALPHAMODE_MASK
        if (baseColor.a < u_AlphaCutoff)
        {
            discard;
        }
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
}