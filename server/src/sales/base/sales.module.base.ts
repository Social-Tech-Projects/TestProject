
import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { ACLModule } from "../../auth/acl.module";
import { AuthModule } from "../../auth/auth.module";

@Module({
  imports: [ACLModule, forwardRef(() => AuthModule), MorganModule],

  exports: [ACLModule, AuthModule, MorganModule],
})
export class SalesModuleBase {}
