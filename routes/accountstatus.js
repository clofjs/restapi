var security = require('./security/security');
var pool = require('../pg');
var qw = require('../helpfunc');
var express = require('express');
var router = express.Router();
router.use(security);

router.get('/:id?',function(req,res,next)
{
    if (security.status==1||security.status==2)
    {
 
        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
                var resl=qw.select(req,'SELECT *  FROM accountstatus ');            
                client.query(resl, function(err, result)
                {
                    if(!err)
                        res.json(result.rows);
                    else
                        res.json(err);
                    done(err);

                });
   
        });
    }else
       res.json({access:"denied"});


});

router.post('/',function(req,res,next)
{
 
 if (security.status==1)
 {
    pool.connect(function(err, client, done)
    {
        if(err) {
            return console.error('error fetching client from pool', err);
        }



        client.query('INSERT INTO accountstatus  (id, name) VALUES ($1,$2);',[req.body.id,req.body.name], function(err, result)
        {
            if(!err)
                res.json(req.body);
            else
                res.json(err);

        });    

    });
  }else
 res.json({access:"denied"});



});


router.delete('/:id?',function(req,res,next)
{
    
  if (security.status==1) 
  {
     pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
             var resl=qw.select(req,'DELETE FROM accountstatus ');            
            client.query(resl, function(err, count)
            {
                if(!err)
                    res.json(count);
                else
                    res.json(err);
            });
          
        });
    
   }else
 	res.json({access:"denied"});
  

});
router.put('/:id?',function(req,res,next)
{

 if (security.status==1) 
 {
    

        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            
        var resl=qw.upd(req,'UPDATE accountstatus SET  ','id');
            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(["status: ","OK!"]);
                else
                    res.json(err);
            });
            

        });

   }else
	 res.json({access:"denied"});


});

module.exports = router;













