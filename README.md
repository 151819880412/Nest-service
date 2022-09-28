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
  https://pincman.com/class-validator-and-class-transformer-cn/#class-transfomer%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3
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
  方法：
  plainToClass
    普通对象转换为类对象
    let users = plainToClass(User, userJson);
    plainToClass会把所有的被转换对象的属性全部赋值给类实例的属性，即时类中并不存在某些属性
    class User {
      id: number
      firstName: string
      lastName: string
    }
    const fromPlainUser = {
      unkownProp: 'hello there',
      firstName: 'Umed',
      lastName: 'Khudoiberdiev',
    }
    console.log(plainToClass(User, fromPlainUser))
    // User {
    //   unkownProp: 'hello there',
    //   firstName: 'Umed',
    //   lastName: 'Khudoiberdiev',
    // }
  plainToClassFromExist
    普通对象合并已经创建的类实例
    const defaultUser = new User();
    defaultUser.role = 'user';
    let mixedUser = plainToClassFromExist(defaultUser, user);
  classToPlain
    类实例转换为普通对象
    转换后可以使用JSON.stringify再转成普通的json文本
    import {classToPlain} from "class-transformer";
    let photo = classToPlain(photo);
  classToClass
    克隆类实例
    import {classToClass} from "class-transformer";
    let photo = classToClass(photo);
    可以使用ignoreDecorators选项去除所有原实例中的装饰器
  serialize
    直接把类实例转换为json文本,是不是数组都可以转换
    import {serialize} from "class-transformer";
    let photo = serialize(photo);
  deserialize
    直接把json文本转换为类对象
    import {deserialize} from "class-transformer";
    let photo = deserialize(Photo, photo);
  deserializeArray
    直接把json数组转换为类对象
    import {deserializeArray} from "class-transformer";
    let photos = deserializeArray(Photo, photos);
  excludeExtraneousValues
    你可以使用excludeExtraneousValues选项结合Expose装饰器来指定需要公开的属性
    import {Expose, plainToClass} from "class-transformer";
    class User {
        @Expose() id: number;
        @Expose() firstName: string;
        @Expose() lastName: string;
    }
    const fromPlainUser = {
      unkownProp: 'hello there',
      firstName: 'Umed',
      lastName: 'Khudoiberdiev',
    }
    console.log(plainToClass(User, fromPlainUser, { excludeExtraneousValues: true }))
    // User {
    //   id: undefined,
    //   firstName: 'Umed',
    //   lastName: 'Khudoiberdiev'
    // }

  多类型选项
    一个嵌套的子类型也可以匹配多个类型，这可以通过判断器实现。判断器需要指定一个 property，而被转换js对象中的嵌套对象的也必须拥有与property相同的一个字段，并把值设置为需要转换的子类型的名称。判断器还需要指定所有的子类型值以及其名称，具体示例如下
    import {Type, plainToClass} from "class-transformer";
    const albumJson = {
      "id": 1,
      "name": "foo",
      "topPhoto": {
          "id": 9,
          "filename": "cool_wale.jpg",
          "depth": 1245,
          "__type": "underwater"
      }
    }
    export abstract class Photo {
      id: number;
      filename: string;
    }
    export class Landscape extends Photo {
      panorama: boolean;
    }
    export class Portrait extends Photo {
      person: Person;
    }
    export class UnderWater extends Photo {
      depth: number;
    }
    export class Album {
      id: number;
      name: string;
      @Type(() => Photo, {
          discriminator: {
              property: "__type",
              subTypes: [
                  { value: Landscape, name: "landscape" },
                  { value: Portrait, name: "portrait" },
                  { value: UnderWater, name: "underwater" }
              ]
          }
      })
      topPhoto: Landscape | Portrait | UnderWater;
    }
    let album = plainToClass(Album, albumJson);
  排除与公开
    公开方法的返回值
    添加 @Expose 装饰器即可公开getter和方法的返回值
    import {Expose} from "class-transformer";
    export class User {
      id: number;
      firstName: string;
      lastName: string;
      password: string;
      @Expose()
      get name() {
          return this.firstName + " " + this.lastName;
      }
      @Expose({ name: "secretKey" })
      getFullName() {
          return this.firstName + " " + this.lastName;
      }
    }
  跳过指定属性
    有时您想在转换过程中跳过一些属性。这可以使用@Exclude装饰器完成：
    import {Exclude} from "class-transformer";
    export class User {
      id: number;
      email: string;
      @Exclude()
      password: string;
    }
    现在，当您转换用户时，password属性将被跳过，并且不包含在转换结果中。
  根据操作决定跳过
    我们可以通过toClassOnly或者toPlainOnly来控制一个属性在哪些操作中需要排除
    import {Exclude} from "class-transformer";
    export class User {
        id: number;
        email: string;
        @Exclude({ toPlainOnly: true })
        password: string;
    }
    现在password属性将会在classToPlain操作中排除，相反的可以使用toClassOnly
  跳过类的所有属性
    你可以通过在类上添加@Exclude装饰器并且在需要公开的属性上添加 @Expose 装饰器来只公开指定的属性
    import {Exclude, Expose} from "class-transformer";
    @Exclude()
    export class User {
      @Expose()
      id: number;
      @Expose()
      email: string;
      password: string;
    }
  另外，您可以在转换期间设置排除策略：
    import {classToPlain} from "class-transformer";
    let photo = classToPlain(photo, { strategy: "excludeAll" });
    这时你不需要在添加@Exclude装饰器了
  跳过私有属性或某些前缀属性
    我们可以排除公开具有指定前缀的属性以及私有属性
    import {Expose} from "class-transformer";
    export class User {
        id: number;
        private _firstName: string;
        private _lastName: string;
        _password: string;
        setName(firstName: string, lastName: string) {
            this._firstName = firstName;
            this._lastName = lastName;
        }
        @Expose()
        get name() {
            return this.firstName + " " + this.lastName;
        }
    }
    const user = new User();
    user.id = 1;
    user.setName("Johny", "Cage");
    user._password = 123;
    const plainUser = classToPlain(user, { excludePrefixes: ["_"] });
    // here plainUser will be equal to
    // { id: 1, name: "Johny Cage" }
  使用组来控制排除的属性
    import {Exclude, Expose} from "class-transformer";
    @Exclude()
    export class User {
        id: number;
        name: string;
        @Expose({ groups: ["user", "admin"] }) // this means that this data will be exposed only to users and admins
        email: string;
        @Expose({ groups: ["user"] }) // this means that this data will be exposed only to users
        password: string;
    }
    let user1 = classToPlain(user, { groups: ["user"] }); // will contain id, name, email and password
    let user2 = classToPlain(user, { groups: ["admin"] }); // will contain id, name and email
  使用版本范围来控制公开和排除的属性
    如果要构建具有不同版本的API，则class-transformer具有非常有用的工具。您可以控制应在哪个版本中公开或排除模型的哪些属性。示例
    import {Exclude, Expose} from "class-transformer";
    @Exclude()
    export class User {
      id: number;
      name: string;
      @Expose({ since: 0.7, until: 1 }) // this means that this property will be exposed for version starting from 0.7 until 1
      email: string;
      @Expose({ since: 2.1 }) // this means that this property will be exposed for version starting from 2.1
      password: string;
    }
    let user1 = classToPlain(user, { version: 0.5 }); // will contain id and name
    let user2 = classToPlain(user, { version: 0.7 }); // will contain id, name and email
    let user3 = classToPlain(user, { version: 1 }); // will contain id and name
    let user4 = classToPlain(user, { version: 2 }); // will contain id and name
    let user5 = classToPlain(user, { version: 2.1 }); // will contain id, name nad password















    /**

请求   --> 过滤器  --> 管道 -> controller

nestjs
  在我们进入每个 Nest 构建块的细节之前，我们可以采取的一些方法来将这些构建快中任何一个绑定到我们应用程序的不同部分
  嵌套构建块可以是：全局 控制器 方法 参数
  不同的绑定技术为我们提供了应用程序中不同界别的粒度和控制，每个都不会覆盖另一个，而是将每个分层在顶部
  过滤器  为了减少内存使用应该使用类而不是实例来应用过滤器(因为 Nest 可以在整个模块中轻松重用同一类的实例)
  守卫
  拦截器
  特定管道    全局管道(app.useGlobalPipes())  单个管道( @UsePipes())
    管道:1.将输入数据转换为所需要的输出数据  2.验证数据 
        NestJS在方法被调用之前触发一个管道，管道还接收要传递给方法的参数，任何转换或验证操作都在此时发生。
        之后，使用任何可能的转换的参数调用路由处理程序
        ValidationPipe    ParseArrayPipe    ParseIntPipe

中间件:是一个在处理路由处理程序和任何其他构建块之前调用的函数，包括拦截器，守卫和管道
  中间件函数可以访问 Request amp 响应对象，并且不专门绑定

app.controller.ts	带有单个路由的基本控制器。
app.controller.spec.ts	针对控制器的单元测试。
app.module.ts	T应用程序的根模块（root module）。
app.service.ts	具有单一方法的基本服务（service）。 method.
main.ts	应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。

SpringBoot:
  controller   前后端交互的请求方法(调用 service 的方法)
  mapper       操作数据库的接口
    xml        操作数据库的接口的具体实现类
  pojo
    dto        dto->entity->数据库  或者 数据库->entity->dto  用来存取固定格式的数据
    vo         数据库->entity->vo    只用来取数据
    entity     与数据库对应的字段
  service      定义很多方法接口
    impl       接口的具体实现类

TypeORM  支持储存库设计模式，这意味着我们创建的每个实体都有自己的储存库 
  Repository : 作为对我们数据源的抽象，并公开了各种有用的方法来与储存在我们数据库中的记录进行交互 
    @InjectRepository(Coffee)   在 Service 中自动注入 Entity
  preload:    此方法根据传入的对象创建一个新实体(先查看数据库中是否存在实体，如果存在就更新，不存在就返回undefind)
  @OntToOne()    :  定义数据库关联一对一的关系
  @OntToMany()   :  定义数据库关联一对多的关系
  @ManyToOne()   :  定义数据库关联一对多的关系
  @ManyToMany()  :  定义数据库关联多对多的关系
  @JoinTable()   :  连接关系的中间表
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })        cascade -- 级联插入  插入和更新启用级联 
  Connection     :  数据库连接对象
  @Index         :  数据库索引
  Database 数据库迁移提供了一种增量更新我们的数据库模式并使其与应用程序数据模型保持同步的方法，同时保留我们数据库中现有的数据
  queryRunner.query()   需要确保重新编译

class-transformer
  @Type(() => Number)   确保被传入的值被解析为数字(需要每个文件都添加)  全局 ： enableImplicitConversion:true
  

DTO : 数据传输对象，用于封装数据并将其从一个应用程序发送到另一个应用程序，DTO帮助我们定义系统内的接口或者输入和输出
      让我们为进入API请求主体的数据的形状创建一个定义。
      但我们不知道是谁在调用这些请求，我们如何确保传入的数据具有正确的形状。或者如果他缺少必填字段

数据库 :
  QueryRunner    处理数据库事务

Entity : 表示 TypeScript 类和数据库表之间的关系

ValidationPipe : 用来验证字段正确性。需要 npm i class-validator class-transformer
  @IsOptional()  动态添加单个附加验证规则到每个字段
  @IsPositive()  如果为正数就大于0
  PartialType  标记所有属性都是可选的 
  transformOptions: {
    enableImplicitConversion: true,   // 隐式类型转换
  },
  whitelist: true               设置白名单
  forbidNonWhitelisted: true    任何非白名单属性都会报错
  transform: true               将传入的数据格式转换为我们定义的类型(get请求id是number但是经过网络传输会自动转为string)   会对性能产生一点点影响

controller 
  控制层，用来和前端交互

跨模块调用
  所有模块都封装了他们的提供者，这意味着如果你想在另一个模块中使用他们，我们必须明确的将他们定义为导出
  @Module({
    exports: [CoffeesService],
  })

流程
  nest generate controller name  / nest g co  生成一个控制器      不生成测试文件：nest g co --no-spec
  nest generate service 或者 nest g s         输入文件名创建服务，cli会创建对应服务和测试文件
  nest g module     生成一个module,需要删除app.module里面的引用，不然会实例化两次
  nest g class coffees/dto/create-coffee.dto --no-spec
  nest g class common/dto/pagination-query.dto --no-spec    创建分页DTO  
  nest g class events/entities/event.entity --no-spec       处理数据库事务相关
  npx typeorm migration:create -n CoffeeRefactor            数据库迁移  typeorm0.2        更改列名时会删除之前所有的数据并新建已列  
    up 代码好了之后需要重新打包并执行  npx typeorm migration:run 
    down 代码好之后需要重新打包并执行  npx typeorm migration:revert
  npx typeorm migration:create src/migrations/CoffeeRefactor    数据库迁移  typeorm0.3+   更改列名时不会改变数据
  nest g mo coffee-rating     创建新module
  nest g s coffee-rating      创建新 service
  nest g mo database          创建 database 连接
  npm install @nestjs/config    用来区分不同环境(开发/生产)
  npm install @hapi/joi       用来确保所有环境变量都得到验证
  npm i --save-dec @types/hapi__joi   类型声明文件
  nest g filter common/filters/http-exception   请求过滤器
  nest g guard common/guards/api-key            关于请求token的
  nest g mo common            注册我们将来可能只做的任何全局增强器
  nest g interceptor common/interceptors/warp-response      请求拦截器
  nest g interceptor common/interceptors/timeout            请求超时响应
  nest g pipe common/pipes/parse-int                  学习 ParseIntPipe 管道
  nest g middleware common/middleware/logging         中间件
  npm i @nestjs/swagger swagger-ui-express            安装 swagger


  @Entity()   装饰实体的类(和数据库同步的类)
  @PrimaryGeneratedColumn()       数据库主键id
  @Column()             数据库一般的列
  @Column('json', { nullable: true })         表示这个列为json对象，可以为null
  @InjectRepository(Coffee)                   注入，将实体类注入
  @nestjs/mapped-types    常见类型转换的包    
    

  docker-compose up -d        分离模式运行docker    命令启动和手动启动效果一样
  npm i @nestjs/typeorm typeorm pg    安装typeorm的数据库
  试运行：--dry-run
  1.1 controller方法
    @controller('xxx')

    @Get()    // 表明这个方法是get请求

    @Get(':id') // 占位符
    aaa(@Param() params){ return 'xxx' }  或者 aaa(@Param('id') id:string){}

    @Post()   //  表明这个方法是post请求
    aaa(@Body() Body){}  或者 aaa(@Body('id') body){}

    @HttpCode()   //  返回自定义httpCode
      @Post()
      @HttpCode(HttpStatus.GONE)
      aaa(@Body() Body){}

    @Res()    //  返回自定义httpCode
      @Get()
      aaa(@res() response){
        response.status(200).send('xxx)
      }

    @Patch(:id)
    aaa(@Param('id) id:string, @Body() body){}

    @Delete('id)
    aaa(@Param('id') id:string){}

    @Query()    //  条件分页
      @Get()
      aaa(@Query() paginationQuery){
        const {limit,offset} = paginationQuery
      }

    HttpException   抛出异常
    hrow new HttpException('抛出异常',HttpStatus.NOT_FOUND)
    NotFoundException('找不到数据')

    @Module({})   模块装饰器，需要一个单一的对象，其属性描述了模块和所有的他的上下文

    @IsOptional()   检查是否缺少值，如果是，则忽略所有验证器。

    @IsPositive()   检查该值是否为大于零的正数。

    @Entity()       装饰实体的类(和数据库同步的类)

    @Index(['xxx', 'xxx'])    创建数据库索引。 可用于实体属性或实体。 在实体上使用时可以使用复合列创建索引。

    @Injectable()   声明xxxService是一个可以由嵌套IoC容器管理的类。被装饰器@Injectable()修饰的类都可以视为服务提供者。

    @UsePipes(xxx)    单个管道添加

    @SetMetadata('key','value')   将自定义元数据附加到路由处理程序的能力

    @Catch(HttpException)     将类标记为 Nest 异常过滤器的装饰器。异常过滤器 处理应用程序代码抛出或不处理的异常。装饰类必须实现 ExceptionFilter 接口。

    @ManyToMany      数据库字段多对多

 */