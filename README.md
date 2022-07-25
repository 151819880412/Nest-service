https://www.bookstack.cn/read/nestjs-8-zh/openapi.md  Nest.js 8.x 中文文档
https://docs.nestjs.cn/8/awesome

# 1.项目结构
    app.controller.ts	带有单个路由的基本控制器。
    app.controller.spec.ts	针对控制器的单元测试。
    app.module.ts	T应用程序的根模块（root module）。
    app.service.ts	具有单一方法的基本服务（service）。 method.
    main.ts	应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
# 2.新项目结构
    controller
    mapper
    pojo
      dto
      entity
      query
      vo
    service
      impl
# 3. swagger
  ApiProperty
    type 类型
    required 是否必须
    description 形容
    default 默认值
    name 属性名称，默认是装璜器润饰的属性名，然而显性的设置name文档中依照这个name的value为最终输出值

  ApiBody
    TypeScript 不会存储无关泛型或接口的元数据.
    须要应用ApiBody显性设置类型。
    对于没用参数装璜器三兄弟的，又须要写文档的，就用ApiBody制订一个DTO
      @ApiBody({ type: [CreateUserDto] })
      createBulk(@Body() usersDto: CreateUserDto[])

  ApiPropertyOptional 
    ApiProperty默认是必填的，如果希望是选填的。
    能够应用ApiPropertyOptional来代替。能够不须要去{required: false}了
    ApiPropertyOptional其它参数参考ApiProperty.

  PartialType()
    对于create操作，所有的参数可能都是必填。
    而对于update操作，只须要更新局部操作。
    通过PartialType能够返回一个所有输出都是可选的参数
      export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
  
  PickType()
    功能从一个输入类型中选择一部分属性来创建一个新类型（类）
    重点是选择一部分
      class PersonDTO {
      @ApiProperty({
          message: '',
          type: String,
      })
      name: string;
      @ApiProperty({
          message: '',
          type: String,
      })
      hintText: string;
      ...
      }
    我们只需要hintText与name
    只需要这么写
      class updateDTO extends PickType(PersonDTO,['name','hintText']){}
      updateDTO只有name与hintText两个属性。
    PickType显然很有用

  OmitType
    OmitType与PickType功能是相反的，写法也一样。
    移除指定的输入属性。

  IntersectionType
    IntersectionType()函数将两种类型组合成一个新类型.
      export class UpdateCatDto extends IntersectionType(CreateCatDto, AdditionalCatInfo) {}
    注意是将两种输入类变成一个输入类，把两个类的所有属性合并为一个类
    PartialType是类的所有成员全部变成可选的。
    PickType对指定输入类选择指定的成员并返回一个类。
    OmitType对指定输入类排除指定的成员并返回一个类。
    IntersectionType是合并两个输入类，合并所有成员。

  更强的组合写法
    函数类映射是支持组合的写法的。
      export class UpdateCatDto extends PartialType( OmitType(CreateCatDto, ['name'] as const), ) {}
  
  枚举
    @ApiProperty({
      enum: ['Admin','SuperAdmin','User'],
      isArray: true,
    })

# 4. class-validator
  常见的验证装饰器	
    @IsDefined(value: any)	检查值是否已定义（!== undefined, !== null）。这是唯一忽略 skipMissingProperties 选项的装饰器。
    @IsOptional()	检查给定值是否为空（=== null，=== undefined），如果是，则忽略该属性上的所有验证器。
    @Equals(comparison: any)	检查值是否等于 ("===") 比较。
    @NotEquals(comparison: any)	检查值是否不等于 ("!==") 比较。
    @IsEmpty()	检查给定值是否为空（=== ''、=== null、=== 未定义）。
    @IsNotEmpty()	检查给定值是否不为空（！== ''，！== null，！== undefined）。
    @IsIn(values: any[])	检查值是否在允许值的数组中。
    @IsNotIn(values: any[])	检查 value 是否不在不允许的值数组中。
  类型验证装饰器	
    @IsBoolean()	检查值是否为布尔值。
    @IsDate()	检查值是否为日期。
    @IsString()	检查字符串是否为字符串。
    @IsNumber(options: IsNumberOptions)	检查值是否为数字。
    @IsInt()	检查值是否为整数。
    @IsArray()	检查值是否为数组
    @IsEnum(entity: object)	检查值是否是有效的枚举
  数字验证装饰器	
    @IsDivisibleBy(num: number)	检查该值是否是可被另一个整除的数字。
    @IsPositive()	检查该值是否为大于零的正数。
    @IsNegative()	检查该值是否为小于零的负数。
    @Min(min: number)	检查给定数字是否大于或等于给定数字。
    @Max(max: number)	检查给定数字是否小于或等于给定数字。
  日期验证装饰器	
    @MinDate(date: Date)	检查值是否是指定日期之后的日期。
    @MaxDate(date: Date)	检查值是否是在指定日期之前的日期。
    字符串类型验证装饰器	
    @IsBooleanString()	检查字符串是否为布尔值（例如“true”或“false”）。
    @IsDateString()	的别名@IsISO8601()。
    @IsNumberString(options?: IsNumericOptions)	检查字符串是否为数字。
  字符串验证装饰器	
    @Contains(seed: string)	检查字符串是否包含种子。
    @NotContains(seed: string)	检查字符串是否不包含种子。
    @IsAlpha()	检查字符串是否仅包含字母 (a-zA-Z)。
    @IsAlphanumeric()	检查字符串是否只包含字母和数字。
    @IsDecimal(options?: IsDecimalOptions)	检查字符串是否为有效的十进制值。默认 IsDecimalOptions 是force_decimal=False, decimal_digits: '1,',locale: 'en-US'
    @IsAscii()	检查字符串是否仅包含 ASCII 字符。
    @IsBase32()	检查字符串是否为 base32 编码。
    @IsBase64()	检查字符串是否经过 base64 编码。
    @IsIBAN()	检查字符串是否为 IBAN（国际银行帐号）。
    @IsBIC()	检查字符串是 BIC（银行识别代码）还是 SWIFT 代码。
    @IsByteLength(min: number, max?: number)	检查字符串的长度（以字节为单位）是否在一个范围内。
    @IsCreditCard()	检查字符串是否为信用卡。
    @IsCurrency(options?: IsCurrencyOptions)	检查字符串是否是有效的货币金额。
    @IsEthereumAddress()	使用基本正则表达式检查字符串是否是以太坊地址。不验证地址校验和。
    @IsBtcAddress()	检查字符串是否为有效的 BTC 地址。
    @IsDataURI()	检查字符串是否为数据 uri 格式。
    @IsEmail(options?: IsEmailOptions)	检查字符串是否为电子邮件。
    @IsFQDN(options?: IsFQDNOptions)	检查字符串是否是完全限定的域名（例如 domain.com）。
    @IsFullWidth()	检查字符串是否包含任何全角字符。
    @IsHalfWidth()	检查字符串是否包含任何半角字符。
    @IsVariableWidth()	检查字符串是否包含全角和半角字符的混合。
    @IsHexColor()	检查字符串是否为十六进制颜色。
    @IsHSLColor()	检查字符串是否是基于CSS Colors Level 4 规范的 HSL 颜色。
    @IsRgbColor(options?: IsRgbOptions)	检查字符串是 rgb 还是 rgba 颜色。
    @IsIdentityCard(locale?: string)	检查字符串是否是有效的身份证代码。
    @IsPassportNumber(countryCode?: string)	检查字符串是否是相对于特定国家代码的有效护照号码。
    @IsPostalCode(locale?: string)	检查字符串是否为邮政编码。
    @IsHexadecimal()	检查字符串是否为十六进制数。
    @IsOctal()	检查字符串是否为八进制数。
    @IsMACAddress(options?: IsMACAddressOptions)	检查字符串是否为 MAC 地址。
    @IsIP(version?: "4"|"6")	检查字符串是否为 IP（版本 4 或 6）。
    @IsPort()	检查字符串是否是有效的端口号。
    @IsISBN(version?: "10"|"13")	检查字符串是否为 ISBN（版本 10 或 13）。
    @IsEAN()	如果字符串是 EAN（欧洲商品编号），则检查字符串是否为 an。
    @IsISIN()	检查字符串是否为 ISIN（股票/证券标识符）。
    @IsISO8601(options?: IsISO8601Options)	检查字符串是否是有效的 ISO 8601 日期格式使用选项 strict = true 对有效日期进行额外检查。
    @IsJSON()	检查字符串是否是有效的 JSON。
    @IsJWT()	检查字符串是否是有效的 JWT。
    @IsObject()	检查对象是否为有效对象（null、函数、数组将返回 false）。
    @IsNotEmptyObject()	检查对象是否不为空。
    @IsLowercase()	检查字符串是否为小写。
    @IsLatLong()	检查字符串是否是格式为 lat, long 的有效经纬度坐标。
    @IsLatitude()	检查字符串或数字是否是有效的纬度坐标。
    @IsLongitude()	检查字符串或数字是否是有效的经度坐标。
    @IsMobilePhone(locale: string)	检查字符串是否为手机号码。
    @IsISO31661Alpha2()	检查字符串是否是官方指定的有效 ISO 3166-1 alpha-2 国家代码。
    @IsISO31661Alpha3()	检查字符串是否是官方指定的有效 ISO 3166-1 alpha-3 国家代码。
    @IsLocale()	检查字符串是否为语言环境。
    @IsPhoneNumber(region: string)	使用 libphonenumber-js 检查字符串是否是有效的电话号码。
    @IsMongoId()	检查字符串是否是 MongoDB ObjectId 的有效十六进制编码表示。
    @IsMultibyte()	检查字符串是否包含一个或多个多字节字符。
    @IsNumberString(options?: IsNumericOptions)	检查字符串是否为数字。
    @IsSurrogatePair()	检查字符串是否包含任何代理对字符。
    @IsUrl(options?: IsURLOptions)	检查字符串是否为 url。
    @IsMagnetURI()	检查字符串是否为磁铁 uri 格式。
    @IsUUID(version?: "3"|"4"|"5"|"all")	检查字符串是否为 UUID（版本 3、4、5 或全部）。
    @IsFirebasePushId()	检查字符串是否为Firebase 推送 ID
    @IsUppercase()	检查字符串是否为大写。
    @Length(min: number, max?: number)	检查字符串的长度是否在一个范围内。
    @MinLength(min: number)	检查字符串的长度是否不小于给定数字。
    @MaxLength(max: number)	检查字符串的长度是否不超过给定的数字。
    @Matches(pattern: RegExp, modifiers?: string)	检查字符串是否与模式匹配。匹配（'foo'，/foo/i）或匹配（'foo'，'foo'，'i'）。
    @IsMilitaryTime()	检查字符串是否是 HH:MM 格式的军事时间的有效表示。
    @IsHash(algorithm: string)	检查字符串是否为哈希 支持以下类型：md4, md5, sha1, sha256, sha384, sha512, ripemd128, ripemd160, tiger128, tiger160, tiger192, crc32, crc32b.
    @IsMimeType()	检查字符串是否匹配有效的MIME 类型格式
    @IsSemVer()	检查字符串是否是语义版本控制规范 (SemVer)。
    @IsISSN(options?: IsISSNOptions)	检查字符串是否为 ISSN。
    @IsISRC()	检查字符串是否为ISRC。
    @IsRFC3339()	检查字符串是否是有效的RFC 3339日期。
  数组验证装饰器	
    @ArrayContains(values: any[])	检查数组是否包含给定值数组中的所有值。
    @ArrayNotContains(values: any[])	检查数组是否不包含任何给定值。
    @ArrayNotEmpty()	检查给定数组是否不为空。
    @ArrayMinSize(min: number)	检查数组的长度是否大于或等于指定的数字。
    @ArrayMaxSize(max: number)	检查数组的长度是否小于或等于指定的数字。
    @ArrayUnique(identifier?: (o) => any)	检查是否所有数组的值都是唯一的。对象的比较是基于引用的。可选函数可以指定哪个返回值将用于比较。
  对象验证装饰器	
    @IsInstance(value: any)	检查属性是否是传递值的实例。
  其他装饰器	
    @Allow()	当没有为它指定其他约束时，防止剥离该属性。