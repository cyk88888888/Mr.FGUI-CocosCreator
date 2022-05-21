export class ModuleCfgInfo {
    public targetClass: any;
    /**模块名称 */
    public name: string;
    /**是否进行缓存 */
    public cacheEnabled: boolean;
    /**需要提前加载的资源列表 */
    preResList: string[];
}