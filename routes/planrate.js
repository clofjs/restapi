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
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var resl=qw.select(req,'SELECT *  FROM planrate ');

            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(result.rows);
                else
                    res.json(err);
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
        var r=req.body;
        client.query("INSERT INTO planrate (planid, resourceid, setupfee, recurringfee, costforadditional, includedvalue, maxvalue) VALUES ($1,$2,$3,$4,$5,$6,$7);",[r.planid, r.resourceid, r.setupfee, r.recurringfee, r.costforadditional, r.includedvalue, r.maxvalue], function(err, result)
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
            var resl=qw.select(req,'DELETE  FROM planrate ');
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
            
            var resl=qw.upd(req,'UPDATE planrate SET  ','id');

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













