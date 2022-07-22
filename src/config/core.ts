import { ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export class CoreModule {
  public static forRoot(options?: TypeOrmModuleOptions) {
    const imports: ModuleMetadata['imports'] = [TypeOrmModule.forRoot(options)];
    return {
      global: true,
      imports,
      module: CoreModule,
    };
  }
}
