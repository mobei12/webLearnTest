const arr = [
	'农、林、牧、渔业',
	'采矿业',
	'制造业',
	'电力、热力、燃气及水生产和供应业',
	'建筑业',
	'批发和零售业',
	'交通运输、仓储和邮政业',
	'住宿和餐饮业',
	'信息传输、软件和信息技术服务业',
	'金融业',
	'房地产业',
	'租赁和商务服务业',
	'科学研究和技术服务业',
	'水利、环境和公共设施管理业',
	'居民服务、修理和其他服务业',
	'教育',
	'卫生和社会工作',
	'文化、体育和娱乐业',
	'公共管理、社会保障和社会组织',
	'国际组织'
];
const arr2 = [
	{
		label: '内资企业',
		code: '100',
		value: '内资企业',
		children: [
			{ label: '国有企业', code: '110', value: '国有企业' },
			{ label: '集体企业', code: '120', value: '集体企业' },
			{ label: '股份合作企业', code: '130', value: '股份合作企业' },
			{
				label: '联营企业',
				code: '140',
				value: '联营企业',
				children: [
					{
						label: '国有联营企业',
						code: '141',
						value: '国有联营企业'
					},
					{
						label: '集体联营企业',
						code: '142',
						value: '集体联营企业'
					},
					{
						label: '国有与集体联营企业',
						code: '143',
						value: '国有与集体联营企业'
					},
					{
						label: '其他联营企业',
						code: '144',
						value: '其他联营企业'
					}
				]
			},
			{
				label: '有限责任公司',
				code: '150',
				value: '有限责任公司',
				children: [
					{
						label: '国有独资公司',
						code: '151',
						value: '国有独资公司'
					},
					{
						label: '其他有限责任公司',
						code: '159',
						value: '其他有限责任公司'
					}
				]
			},
			{
				label: '股份有限公司',
				code: '160',
				value: '股份有限公司'
			},
			{
				label: '私营企业',
				code: '170',
				value: '私营企业',
				children: [
					{
						label: '私营独资企业',
						code: '171',
						value: '私营独资企业'
					},
					{
						label: '私营合伙企业',
						code: '172',
						value: '私营合伙企业'
					},
					{
						label: '私营有限责任公司',
						code: '173',
						value: '私营有限责任公司'
					},
					{
						label: '私营股份有限公司',
						code: '174',
						value: '私营股份有限公司'
					}
				]
			},
			{
				label: '其他企业',
				code: '190',
				value: '其他企业'
			}
		]
	},
	{
		label: '港、澳、台商投资企业',
		code: '200',
		value: '港、澳、台商投资企业',
		children: [
			{
				label: '合资经营企业（港或澳、台资）',
				code: '210',
				value: '合资经营企业（港或澳、台资）'
			},
			{
				label: '合作经营企业（港或澳、台资）',
				code: '220',
				value: '合作经营企业（港或澳、台资）'
			},
			{
				label: '港、澳、台商独资经营企业',
				code: '230',
				value: '港、澳、台商独资经营企业'
			},
			{
				label: '港、澳、台商投资股份有限公司',
				code: '240',
				value: '港、澳、台商投资股份有限公司'
			},
			{
				label: '其他港、澳、台商投资企业',
				code: '290',
				value: '其他港、澳、台商投资企业'
			}
		]
	},
	{
		label: '外商投资企业',
		code: '300',
		value: '外商投资企业',
		children: [
			{
				label: '中外合资经营企业',
				code: '310',
				value: '中外合资经营企业'
			},
			{
				label: '中外合作经营企业',
				code: '320',
				value: '中外合作经营企业'
			},
			{
				label: '外资企业',
				code: '330',
				value: '外资企业'
			},
			{
				label: '外商投资股份有限公司',
				code: '340',
				value: '外商投资股份有限公司'
			},
			{
				label: '其他外商投资企业',
				code: '390',
				value: '其他外商投资企业'
			}
		]
	}
];
const rest = arr.map(item => {
	return {
		label: item,
		value: item
	};
});
console.log(rest);
