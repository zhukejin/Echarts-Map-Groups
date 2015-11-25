Echarts-Demo
--
使用Echarts 做的一些图表Demo，总体来说Echarts还是很不错的，只不过有一些bug
>Echarts 版本号 1.4.1
>
>加载器 RequireJs
>
>也有可能是自身原因没有找到解决办法。
>
>Demo地址 ： [http://demo.zhukejin.com/7-screen/](http://demo.zhukejin.com/7-screen/)

数据是随机生成的，全是假的，时间是获取的当前时间的前15分钟，因为服务器的原因，所以时间不准确。

### 发现的一些Bug ：

- 在加载了echarts-map 模块后，渲染大规模MarkPoint 地图标注特效的时候，所有标注点都会集中在地图外的一个点，同时也导致渲染消耗增大。

解决方案： 使用src单文件版 map.js 。

- 在同时存在两个折线图上使用MarkPoint-Effect 动画效果的时候，后渲染的折线图 Markpoint 点会出现不正常的动画效果 （比如中心点偏移、中心点移动等等）。
