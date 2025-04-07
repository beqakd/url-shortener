import { ModuleSeeder } from '../../../libs/common/src';
import { UrlSeeder } from './url.seeder';

export class UrlModuleSeeder extends ModuleSeeder {
  public override async run() {
    await this.call(UrlSeeder);
  }
}
