export default {
  DMLTransaction: 'DML语句采用事务机制执行',
  DDLCheckTableComment: '强制表必须拥有表注释',
  DDlCheckColumnComment: '强制表字段必须拥有列注释',
  DDLCheckColumnNullable: '强制非timestamp类型字段必须为NOT NULL',
  DDLCheckColumnDefault: '强制非text,blob,json,timestamp类型字段必须拥有默认值',
  DDLCheckFloatDouble: '强制float/double类型变更为decimal类型',
  DDLEnableAutoincrementInit: '强制自增列初始值为1',
  DDLPrimaryKeyMust: '强制主键名称为ID',
  DDLEnableAutoIncrement: '强制主键为自增列',
  DDLEnableAutoincrementUnsigned: '强制主键必须使用无符号标志unsigned',
  DDLIndexNameSpec: '开启索引名称规范(索引名必须以idx_为开头)',
  CheckIdentifier: '开启mysql关键词检查',
  DDLEnableAcrossDBRename: '允许跨库表迁移',
  DDLEnableDropTable: '允许删除表',
  DDLEnableDropDatabase: '允许删除数据库',
  DDLAllowPRINotInt: '允许主键类型为非int/bigint',
  DDLEnableNullIndexName: '允许索引名为空',
  DDLMultiToCommit: '允许单个工单提交多条DDL语句',
  DDLEnablePrimaryKey: '是否检查必须拥有主键',

  DDLAllowMultiAlter: '允许单个工单执行多条ALTER语句',
  DDLAllowColumnType:
    '允许字段进行类型转换(不同字段之间的转换或长度从长变短。如:int -> bigint,int(50) -> int(20))',
  DDLAllowChangeColumnPosition: '允许使用after/first',
  AllowCreateView: '允许创建视图',
  AllowCreatePartition: '允许创建分区',
  AllowSpecialType: '允许添加bit,enum,set类型字段',
  SupportCollation:
    'create/alter 表或字段时允许的Collate范围。多个请使用逗号进行分割',
  SupportCharset:
    'create/alter 表或字段时允许的字符集范围。多个请使用逗号进行分割',
  MustHaveColumns: '建表必须拥有的字段,多个字段请用逗号分隔',
  DDLMaxKeyParts: '单个索引指定字段上限',
  DDLMaxKey: '单个表最多允许几个索引',
  MaxDDLAffectRows: 'DDL最大影响行数',
  DDLMaxCharLength: 'char字段最大长度',
  MaxTableNameLen: '表名最大长度',
  DMLMaxInsertRows: 'Insert最大插入行数上限',
  DMLAllowLimitSTMT: '允许update/insert 语句使用limit关键字',
  DMLAllowInsertNull: '允许insert语句插入null值',
  DDLImplicitTypeConversion: '不允许隐式转换',
  DMLInsertColumns: '检查Insert语句中插入的字段名是否存在',
  DMLWhere: '强制DML语句必须拥有where条件',
  DMLOrder: '禁止DML语句使用Order by子句',
  DMLSelect: '禁止DML语句使用Select子句',
  MaxAffectRows: 'DML最大影响行数',
  IsOSC: '开启在线表变更工具',
  OscSize: '表体积大于该值后触发在线表变更同步，单位:M',
  OSCExpr:
    '同步工具参数。如: PT-OSC 请注意! 此处仅填写参数。请使用以下变量名替换对应输入值 $SQL $ADDR $PORT $USER $PASSWORD $SCHEMA $TABLE。例子: (pt-osc配置) pt-online-schema-change  --alter $SQL --user=$USER  --password=$PASSWORD  --host=$ADDR P=$PORT,D=$SCHEMA,t=$TABLE  --execute',
  global: '全局规则',
  custom_list: '自定义规则列表',
  custom: '自定义规则',
};
