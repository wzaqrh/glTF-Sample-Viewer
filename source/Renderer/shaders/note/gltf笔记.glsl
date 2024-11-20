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