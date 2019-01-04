# 项目说明

> 基于vue框架搭建

## 构建运行说明

``` bash
# 第一次运行项目时执行，安装项目依赖
npm install

# 本地调试运行启动项目，启动端口在config/index.js中配置，访问地址为http://localhost:8082/operation/#/login
npm run dev

# 构建打包，文件生成到dist目录下面
npm run build

# 构建打包，并生成打包后的文件分析报告
npm run build --report
```

## 后端返回数据格式约定
```
// 接口返回json数据格式模板
// 后端所有数据以如下json格式进行返回，data中具体数据格式，根据前端需要进行定义
{
  code: "String|状态码，1代表成功 其他数字代表失败",
  data: "String|Object|Number|Boolean|返回的数据",
  message: "String|状态说明",
}

// 列表数据接口json格式模板
{
  code: "String|状态码，1代表成功 其他数字代表失败",
  data: {
    list: [],
    page: {
      currentPage: "Number|当前页",
      pageSize: "Number|页的大小",
      total: "Number|数据总量",
    },
  },
  message: "String|状态说明",
}
```
## 前端发送数据格式约定
1.	一层嵌套的表单可以用application/x-www-form-urlencoded或者application/json;charset=UTF-8发送，例如：
```
{ 
  loginName: 'xiaoming', 
  password: '123456' 
}
```
2.	多层嵌套数据或者含有数组对象的数据，统一使用application/json;charset=UTF-8格式发送，例如：
```
{
  provinceId: '',
  cityId: '',
  areaId: '',
  apps: [{
    name: '学籍系统',
    id: '12345'
  }]
}
```
3. 通用参数命名约定
```
{
  currentPage: "Number|分页参数，当前页码数",
  pageSize: "Number|分页参数，每页记录条数"
}
```

