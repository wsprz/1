var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.get('/', function (req, res, next) {
// console.log(res.params)
  let {dataName,q,rule,start,count} = res.params;
  if (!dataName) {
    res.redirect('/admin/error?msg=dataName为必传参数')
    return;
  }


  let common_data = {
    ...res.user_session, 
    ...res.params, 
    page_header: dataName + '列表',
    start: start + 1,
    api_name:'product'
  }

  mgdb({
    collection: dataName
  }, ({ collection, client }) => {
    collection.find(
      q ? { id:eval('/' + q + '/g')  } : {},
      {
        projection: {
          _id: 1, name: 1,id:1
        },
        // sort: rule? {[rule]:-1} : {'detail.auth':-1}
        sort: rule ? { [rule]: -1 } : { 'time': -1 } //排序条件默认按时间排序
      }
    ).toArray((err, result) => {
      let checkResult = result.slice(start * count, start * count + count)//提取要分页的数据
      let data = {
        ...common_data,
        page_data: checkResult,
        page_count: Math.ceil(result.length / count)//计算总页数
      }
      console.log(result)
      res.render('product', data);
      client.close();
    })
  })

});

router.use('/add', require('./product/add'));
router.use('/del', require('./product/del'));
router.use('/check', require('./product/check'));

module.exports = router;
