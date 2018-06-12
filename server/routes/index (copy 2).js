var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/getContentFromUrl',(req,res)=>{
  // res.send(req.body);
  let list=[];
  let old=[];
  //Accessing URL to parse 
  var url = req.body.url;
  //Fetchig response from URL
  request(url, function(error, response, html){
    if(!error){
      var diff = '-';
     
      console.log("Each hyphen(-) indicates headings weight (i.e '-' = h1 tag contents, '--' = h2 tag contents etc)");
      //Parsing Response
      var $ = cheerio.load(html);
      // console.log($('h1,h2,h3,h4,h5,h6')[3].name);
      let prevKey
      let keyDiff;
      let lastUsedKey;
      let currKey;
      $('h1,h2,h3,h4,h5,h6').map(function(i, ele){
        let temp = {};
        let obj={};
        

        temp.tag =$(this).get(0).tagName
        temp.title = $(this).text().trim();
        currKey =parseInt(temp.tag.substring(1,2));
        // obj.content = diff.repeat(currKey) + '<'+temp.tag+'>'+temp.title+'</'+temp.tag+'>';
        // old.push(obj);

        if(i==0){
          
          lastUsedKey = 1 ;
          // console.log(diff.repeat(key) + '<'+temp.tag+'>'+temp.title+'</'+temp.tag+'>')      
          obj.content = diff.repeat(lastUsedKey) + '<h'+lastUsedKey+'>'+temp.title+'</h'+lastUsedKey+'>';
        }
        else{

          prevKey = parseInt($('h1,h2,h3,h4,h5,h6')[i-1].name.substring(1,2));
          // console.log(prevKey);
          
          
          
          // console.log(diff.repeat(key) + '<'+temp.tag+'>'+temp.title+'</'+temp.tag+'>')
          keyDiff=parseInt(currKey)-parseInt(prevKey);

          if(keyDiff > 0 ){
            console.log("keydiff greater then 0");
            lastUsedKey += 1;
            obj.content = diff.repeat(lastUsedKey) + '<h'+(lastUsedKey)+'>'+temp.title+'</h'+(lastUsedKey)+'>';
          }
          else if(keyDiff < 0)
          {
            console.log("keydiff less then 0");
            if(lastUsedKey == 1){
              obj.content = diff.repeat(lastUsedKey) + '<h'+lastUsedKey+'>'+temp.title+'</h'+lastUsedKey+'>';
            }
            else{
              lastUsedKey -= 1;
              obj.content = diff.repeat(lastUsedKey) + '<h'+lastUsedKey+'>'+temp.title+'</h'+lastUsedKey+'>';
            }
            
          }
          else{
            console.log("keydiff is 0");
            obj.content = diff.repeat(lastUsedKey) + '<h'+(lastUsedKey)+'>'+temp.title+'</h'+(lastUsedKey)+'>';
          }
          
        }
        
        // console.log(i,keyDiff,lastUsedKey, obj.content);
        
        list.push(obj);
        
      });
      // console.log(old);
      
      console.log(list);
      res.json({"msg":"Scraping successfull Each hyphen(-) indicates headings weight (i.e '-' = h1 tag contents, '--' = h2 tag contents etc) Otput is diplayed on the console and also saved to scrape.json file in project directory","content":list,"old":old})
    } else {
      console.log("error");
    }
  })

  
})

module.exports = router;
