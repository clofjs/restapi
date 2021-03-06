var security = require('../security/security');
var express = require('express');
var router = express.Router();
var pool = require('../../pg');
var qw = require('../../helpfunc')



router.get('/:id?',function(req,res,next)
{
	
if (security.status==1)
 {    

    	qw.fullinfo('salesorder','orddet','orderid',req,res,pool);
 }
        
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
        client.query("INSERT INTO salesorder (customeraccountid, orderstatusid, ordertypeid, total_value, descr, salesid) VALUES ($1,1,$2,$3,$4,$5);",[r.customeraccountid, r.ordertypeid, r.total_value, r.descr, r.salesid], function(err, result)
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

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT orderstatusid FROM salesorder where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&result.rows[0].orderstatusid==1)
                    {
                  		
				            client.query('DELETE FROM salesorder where id= $1',[req.params.id], function(err, result1)
				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json({msg:"only orders in new status can be deleted"});
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});



router.put('/:id?',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT orderstatusid FROM salesorder where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&req.body.orderstatusid>result.rows[0].orderstatusid)
                    {
                  	

				            client.query('UPDATE salesorder set  orderstatusid =$1 where id= $2',[req.body.orderstatusid,req.params.id], function(err, result1)
				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json(err);
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});




//---------------------------------------------------
// details 
//---------------------------------------------------

router.get('/:id/detail',function(req,res,next)
{
    if (security.status==1||security.status==2)
    {
        pool.connect(function(err, client, done)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            
            client.query('SELECT *  FROM orddet where orderid =$1',[req.params.id], function(err, result)
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

/*


router.put('/:id/detail',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT orderstatusid FROM salesorder where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&result.rows[0].orderstatusid==1)
                    {
                  	var resl=qw.upd(req,'UPDATE orddet SET  ','orderid');

				            client.query(resl, function(err, result1)
				            {
				                if(!err)
				                    res.json(["status: ","OK!"]);
				                else
				                    res.json(err);
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});

*/
router.post('/:id/detail',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT orderstatusid FROM salesorder where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&result.rows[0].orderstatusid==1)
                    {
                  		
			       			var r=req.body;
                			client.query("INSERT INTO orddet (orderid, unitprice_value, servqty, duration, discountamt_value, extendedprice_value, subscriptionid, planperiodid, resourceid, descr) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",[req.params.id, r.unitprice_value, r.servqty, r.duration, r.discountamt_value, r.extendedprice_value, r.subscriptionid, r.planperiodid, r.resourceid, r.descr], function(err, result1)

				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json({msg:"only orders in new status can be deleted"});
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});

router.delete('/:id/detail',function(req,res,next)
{

if (security.status==1&&req.params.id)
 {
        pool.connect(function(err, client)
        {
            if(err) {
                return console.error('error fetching client from pool', err);
            }

			client.query('SELECT orderstatusid FROM salesorder where id= $1',[req.params.id], function(err, result)
            {
                if(!err&&result.rows[0].orderstatusid==1)
                    {
                  		
				            client.query('DELETE FROM orddet where orderid= $1',[req.params.id], function(err, result1)
				            {
				                if(!err)
				                    res.json({status: "OK!"});
				                else
				                    res.json({msg:"only orders in new status can be deleted"});
				            });

                    }
                else
                    res.json(err);
            });            
        });


}else
      res.json({access:"denied"});
});



module.exports = router;













