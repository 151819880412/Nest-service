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