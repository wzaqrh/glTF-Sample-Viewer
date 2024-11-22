迪士尼PBR白皮书 https://media.disneyanimation.com/uploads/production/publication_asset/48/asset/s2012_pbs_disney_brdf_notes_v3.pdf
The PBR Guide https://www.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-1
The PBR Guide https://www.adobe.com/learn/substance-3d-designer/web/the-pbr-guide-part-2

#折射率IOR（Index of Refraction）
{
	#Snell Law
	n1 * sin(theta1) = n2 * sin(theta2)
		n1: 入射介质的折射率
		n2: 折射介质的折射率
		theta1: 入射角（光线与法线的夹角）
		theta2: 折射角（折射光线与法线的夹角）
	
	#金属的复数折射率	
	IOR = n + ik
		n: 实部折射率，描述光线在金属表面发生折射的能力
		k: 虚部消光系数（Extinction Coefficient），描述光线在金属内部传播时的能量吸收程度
		i: 虚数单位（满足i^2=-1）
		
	#常见材质的 IOR 值
		空气: 1.0003
		水: 1.33
		冰: 1.31
		普通玻璃: 1.5
		钻石: 2.42
		塑料: 1.45 - 1.6
		石英: 1.54
		金: (0.47 + 2.35i)
		银: (0.16 + 4.1i)
		铜: (0.64 + 2.54i)
		铝: (1.28 + 7.68i)
}

#反射率
{
	#Fresnel Equations
		'垂直偏振光（Perpendicular Polarized Light）'：Rs = ((n1 * cos(theta1) - n2 * cos(theta2)) / (n1 * cos(theta1) + n2 * cos(theta2)))^2
		'平行偏振光（Parallel Polarized Light）'：	   Rp = ((n1 * cos(theta2) - n2 * cos(theta1)) / (n1 * cos(theta2) + n2 * cos(theta1)))^2
		'总反射率'：R = (Rs + Rp) / 2
		#适用条件
			界面光滑
			均匀各向同性介质
			单一波长光线
			无表面吸收
			
	#Schlick 近似
		'Fresnel 反射率'：F(theta) = F0 + (1 - F0) * (1 - cos(theta))^5
		'F0（法线方向反射率，垂直入射）':
			#非金属材质（Dielectric）：
				灰度值[0.02-0.05]
				F0通常由'折射率'计算得出
				F0 = ((n1 - n2) / (n1 + n2))^2
			#金属材质（Metallic）
				RGB[0.5-1.0]
				F0是'材质的镜面反射颜色'（一般由'艺术家定义'或'测量'）
		'F90（掠射角方向反射率）'
			F90 = F(90)
			控制'掠射角'（光线几乎平行于表面）的反射行为，模拟'强反射效果'
			#反射强度增强
				'Fresnel效应': 在掠射角，反射率急剧增加，趋近于1（完全反射）
				物理原因：
					光线接近平行表面时，光的'电场分量与表面方向更加对齐'，导致'更多光被反射'而非折射
					特别是'金属表面'，掠射角反射率几乎恒定为1
	#微表面理论 引入粗糙度
		#光滑表面（低粗糙度）
			Fresnel 效应表现强烈。
			'掠射角方向'的'反射率'接近 1
			'表面反射光'集中在'一个方向'，镜面高光'清晰'
		#粗糙表面（高粗糙度）
			Fresnel 效应在'掠射角方向'依然'有效'，但视觉表现'被散射弱化'
			'镜面反射'变得'模糊'，'掠射角高反射'的'特点'不明显	
	
}

#Base Color
{
	#金属材质
		baseColor = F0
	#非金属性材质
		baseColor = albedo
		对于'电介质'
}

#线性空间渲染（Linear Space Rendering）
	人类视觉系统 (HVS) 对'暗色调'的相对差异比'亮色调'更'敏感'
	#sRGB贴图
		base color, diffuse, specular and emissive
	#Linear贴图
		roughness, ambient occlusion, normal, metallic, and height