var express = require('express');
var router = express.Router();

module.exports = router;
var pool = require('../pg');
var qw = require('../helpfunc');

router.get('/',function(req,res,next)
{
    if (router.status==1||router.status==2)
    {
            pool.connect(function(err, client, done)
            {
                if(err) {
                    return console.error('error fetching client from pool', err);
                }
                var resl=qw.select(req,'SELECT *  FROM docdet');
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
    if (router.status==1)
    {
  
        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var r=req.body;
            client.query("INSERT INTO docdet(docid, unitprice_value, extendedprice_value, servqty, duration, durbillperiod, durbillperiodtypeid, planperiodid, resourceid, discountamt_value, plancategoryid, ddorddetid, ddorderid, subscriptionid, descr) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);",[r.docid, r.unitprice_value, r.extendedprice_value, r.servqty, r.duration, r.durbillperiod, r.durbillperiodtypeid, r.planperiodid, r.resourceid, r.discountamt_value, r.plancategoryid, r.ddorddetid, r.ddorderid, r.subscriptionid, r.descr], function(err, result)
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


router.delete('/',function(req,res,next)
{
    if (router.status==1)
    {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

            var resl=qw.select(req,'DELETE *  FROM docdet ');

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
router.put('/',function(req,res,next)
{
    if (router.status==1)
    {

        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            var r=req.body;
                        var resl=qw.upd(req.body,'UPDATE docdet SET ');

            client.query(resl, function(err, result)
            {
                if(!err)
                    res.json(r);
                else
                    res.json(err);
            });
        });
    }else
  res.json({access:"denied"});


});

module.exports = router;













