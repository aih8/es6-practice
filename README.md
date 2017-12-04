###1.项目详细结构：
* --app 
  - --components  &nbsp;&nbsp;&nbsp; *// 项目通用组件*
    + --Layer    &nbsp;&nbsp;&nbsp; *// loading组件*
    + --order   &nbsp;&nbsp;&nbsp; *// 订单相关*
      + alert.js  &nbsp;&nbsp;&nbsp; *// 弹窗组件*
      + alert.less  &nbsp;&nbsp;&nbsp; *// 弹窗组件样式*
      + OrderPagination.js &nbsp;&nbsp;&nbsp; *// 分页组件*
    + --PageMinHeight  &nbsp;&nbsp;&nbsp; *// 容器高度等于可视区域高度*
  - --config &nbsp;&nbsp;&nbsp; *// 全局配置信息*
    + ajax.config.js    &nbsp;&nbsp;&nbsp; *// axios 全局配置 控制全局loading*
    + config.js    &nbsp;&nbsp;&nbsp; *// 控制与后端通信的ip地址*
    + onEnterFunction.js    &nbsp;&nbsp;&nbsp; *// 检测浏览器端的登录cookie信息*
    + weChat.js    &nbsp;&nbsp;&nbsp; *// 微信配置信息，本项目中无用*
   - --global &nbsp;&nbsp;&nbsp; *// 全局的工具函数*
      + cities.js    &nbsp;&nbsp;&nbsp; *// 前后端通用的投保区域文件*
      + global.js    &nbsp;&nbsp;&nbsp; *// 部分工具函数（时间format，改document.title等）*
      + isEmpty.js    &nbsp;&nbsp;&nbsp; *// 判空函数*
   - --images &nbsp;&nbsp;&nbsp; *// 图片存放文件夹*
   - --redux &nbsp;&nbsp;&nbsp; *// redux相关文件*
     + --actions   &nbsp;&nbsp;&nbsp; *// redux actions 文件夹*
     + --reducers  &nbsp;&nbsp;&nbsp; *// redux 初始数据状态 文件夹*
     + --store &nbsp;&nbsp;&nbsp; *// 创建全局store 以及增强器（支持异步action异步）*
   - --service &nbsp;&nbsp;&nbsp; *// 部分service文件*
      + --authService  &nbsp;&nbsp;&nbsp; *// 登录相关service文件*
      + downLoadService.js    &nbsp;&nbsp;&nbsp; *// 资源下载函数*
   - --views&nbsp;&nbsp;&nbsp; *// 项目view文件夹*
      + --default404  &nbsp;&nbsp;&nbsp; *// 404页面*
      + --login  &nbsp;&nbsp;&nbsp; *// 登录页面*
      + --navbar &nbsp;&nbsp;&nbsp; *// 导航条*
      + --pages &nbsp;&nbsp;&nbsp; *// 项目页面*
        + --apply &nbsp;&nbsp;&nbsp; *// 申请查看页面*
        + --black &nbsp;&nbsp;&nbsp; *// 黑名单页面*
        + --core &nbsp;&nbsp;&nbsp; *// 核心改造相关页面 文件夹*
           + --components &nbsp;&nbsp;&nbsp; *// 核心改造相关组件 文件夹*  
              - actionPageTrack.js &nbsp;&nbsp;&nbsp; *//投放详情页面--动作页面的展示组件*
              - ageLimit.js &nbsp;&nbsp;&nbsp; *//订单创建页面--年龄限制组件*
              - ageTable.js &nbsp;&nbsp;&nbsp; *//订单配置（投放配置）详情页面--年龄展示组件*
              - areaTable.js &nbsp;&nbsp;&nbsp; *//订单配置（投放配置）详情页面--区域展示组件*
             - channelAreaTable.js &nbsp;&nbsp;&nbsp; *//订单配置（投放配置）详情页面--渠道区域（精准）展示组件*
             - channelTable.js &nbsp;&nbsp;&nbsp; *//订单配置（投放配置）详情页面--渠道展示组件*
             - chooseList.js &nbsp;&nbsp;&nbsp; *//创建订单页面--切换配置模式组件*
             - common.less &nbsp;&nbsp;&nbsp; *//components文件夹下 组件的样式文件*
             - commonConfigTabel.js &nbsp;&nbsp;&nbsp; *//订单配置（投放配置）详情页面--渠道展示组件*
             - controller.js &nbsp;&nbsp;&nbsp; *//订单详情页面--展示下级渠道详情控制器*
             - group.js &nbsp;&nbsp;&nbsp; *//订单列表页 -- 订单详情列表*
             - list.js &nbsp;&nbsp;&nbsp; *//订单列表页 -- 订单详情列表 list*
             - item.js &nbsp;&nbsp;&nbsp; *//订单列表页 -- 订单详情列表 item*
             - insurancePolicyCountList.js &nbsp;&nbsp;&nbsp; *//投放详情页面 -- 动作页面保险数据展示组件*
             - normalPage.js &nbsp;&nbsp;&nbsp; *//投放详情页面 -- 普通页面展示pv uv 组件*
             - numberinpputSelect.js &nbsp;&nbsp;&nbsp; *//创建订单页面 -- 配置量选框 可输入数字或选择不限*
             - pageShow.js &nbsp;&nbsp;&nbsp; *//投放详情页面 -- 普通页面展示页面基本信息组件*
             - painter.js &nbsp;&nbsp;&nbsp; *//渠道（订单）报警页面 折线图 组件*
             - PrecisionConfig.js &nbsp;&nbsp;&nbsp; *//创建订单页面 精准配置模式组件*
             - sexLimit.js &nbsp;&nbsp;&nbsp; *//创建订单页面 年龄配置组件*
             - sexTable.js &nbsp;&nbsp;&nbsp; *//订单配置（投放配置）详情页面--年龄配置展示组件*
             - subTitle.js &nbsp;&nbsp;&nbsp; *//副标题展示组件*
             - Tips.js &nbsp;&nbsp;&nbsp; *//问号  冒泡展示详情组件*
             - TipsPlus.js &nbsp;&nbsp;&nbsp; *//冒泡展示详情组件*
          + --coreService &nbsp;&nbsp;&nbsp; *// 核心改造相关Service 文件夹* 
            + coreService.js &nbsp;&nbsp;&nbsp; *// 核心改造sevice 文件*  
          + --page&nbsp;&nbsp;&nbsp; *// 核心改造相关view* 
            + --ad &nbsp;&nbsp;&nbsp; *// 投放相关文件夹 * 
                + --batchConfig &nbsp;&nbsp;&nbsp; *// 批量替换订单 文件夹* 
                + adConfigDetail.js &nbsp;&nbsp;&nbsp; *// 投放配置详情*
                + add.js &nbsp;&nbsp;&nbsp; *// 创建（编辑）投放*
                + detail.js &nbsp;&nbsp;&nbsp; *// 投放 详情页面*
                + index.js &nbsp;&nbsp;&nbsp; *// 投放列表 页面*
                + Service.js &nbsp;&nbsp;&nbsp; *// 部分投放相关 service*
            + --channelWarn &nbsp;&nbsp;&nbsp; *// 渠道报警页面*     
            + --enter &nbsp;&nbsp;&nbsp; *// 核心改造入口页面*
            + --insurance &nbsp;&nbsp;&nbsp; *// 赠险管理页面*   
                + add.js &nbsp;&nbsp;&nbsp; *// 新增(编辑)赠险*
                + detail.js &nbsp;&nbsp;&nbsp; *// 赠险详情页面*
                + index.js &nbsp;&nbsp;&nbsp; *// 赠险列表页面*  
            + --marketChannel &nbsp;&nbsp;&nbsp; *// 渠道管理页面*
                + detail.js &nbsp;&nbsp;&nbsp; *// 渠道详情页面*
                + index.js &nbsp;&nbsp;&nbsp; *// 渠道列表页面 （新增/编辑）*     
            + --operationList &nbsp;&nbsp;&nbsp; *//操作历史记录* 
            + --orderWarn &nbsp;&nbsp;&nbsp; *//订单报警*
            + --party_a &nbsp;&nbsp;&nbsp; *//甲方管理*
            + --party_b &nbsp;&nbsp;&nbsp; *//乙方管理*
            + --queationnaire &nbsp;&nbsp;&nbsp; *//问卷管理*
                + add.js &nbsp;&nbsp;&nbsp; */新增问卷*
                + index.js &nbsp;&nbsp;&nbsp; */问卷列表*
            + --roleManage &nbsp;&nbsp;&nbsp; *//角色管理*
            + --total &nbsp;&nbsp;&nbsp; *//数据汇总*
            + --userList &nbsp;&nbsp;&nbsp; */用户列表*
        + --util &nbsp;&nbsp;&nbsp; *// 工具函数*
            + cityInPro.js 根据城市归类到省
      + --earnings &nbsp;&nbsp;&nbsp; *//收益管理*
      + --order &nbsp;&nbsp;&nbsp; */订单管理*
        + --add &nbsp;&nbsp;&nbsp; */新增（编辑）订单 （newAdd.js）*
        + --batch &nbsp;&nbsp;&nbsp; *//订单批次管理列表*
        + --component &nbsp;&nbsp;&nbsp; */订单相关组件 文件夹*
            + --detail &nbsp;&nbsp;&nbsp; *//订单详情 -- 各渠道环形图*
            + Breadcrumb.js &nbsp;&nbsp;&nbsp; *// 面包屑组件*
            + centerComponent.js &nbsp;&nbsp;&nbsp; *//创建订单--分中心管理*
            + Item.js &nbsp;&nbsp;&nbsp; *// 订单列表 组件 item*
            + List.js &nbsp;&nbsp;&nbsp; *// 订单列表 组件 List*
            + pain.js &nbsp;&nbsp;&nbsp; *// 自定义 环形图 组件*
            + painter2.js &nbsp;&nbsp;&nbsp; *// 订单详情页面 折线图组件*
        + --detail &nbsp;&nbsp;&nbsp; *// 订单详情 相关*
            + detail.js &nbsp;&nbsp;&nbsp; *// 订单详情页面*
            + orderConfigDetail.js &nbsp;&nbsp;&nbsp; *// 订单配置详情页面*
        + --index &nbsp;&nbsp;&nbsp; *// 订单列表 页面*
        + --insureDetail &nbsp;&nbsp;&nbsp; *// 投保记录详情*
        + --prepare &nbsp;&nbsp;&nbsp; *//发送准备页面*
        + --ready &nbsp;&nbsp;&nbsp; *//批次准备页面*
     + --reservoir &nbsp;&nbsp;&nbsp; *//蓄水池*
     + --total &nbsp;&nbsp;&nbsp; *//总库*
     + Container.js &nbsp;&nbsp;&nbsp; *//容器*
     + LayerContainer.js &nbsp;&nbsp;&nbsp; *//带全局loading的最外层容器*
  + app.less &nbsp;&nbsp;&nbsp; *//全局样式文件*
  + index.html &nbsp;&nbsp;&nbsp; *//全局html入口文件* 
  + main.entry.js &nbsp;&nbsp;&nbsp; *//全局js入口文件* 
  + router.js  &nbsp;&nbsp;&nbsp; *//全局路由管理* 
* --common    &nbsp;&nbsp;&nbsp; *// 通用资源文件夹* 
* package.json &nbsp;&nbsp;&nbsp; *//项目依赖* 
* webpack.conf.js &nbsp;&nbsp;&nbsp; *// 打包配置文件* 
* webpack.dll.conf.js &nbsp;&nbsp;&nbsp; *// dll打包配置文件* 
