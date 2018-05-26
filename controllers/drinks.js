var db = require('../models');

function index(req, res){
    console.log('GET drink index')
    db.Drink.find({}, function(err, drink){
        if(err){
            res.send(err);
        }
        return res.json(drink);
    });
}

function create(req, res){
    console.log('POST drink')
	console.log(req.body)
	db.Drink.create(req.body, function(err, drink){
		if(err){
			res.send(err);
		}
		res.json(drink);
	});
}

function show(req, res){
	console.log('GET one drink')
	console.log(`req.params.id: ${req.params.drink_id}`);
	db.Drink.findById(req.params.drink_id, function(err,foundDrink){
		res.json(foundDrink);
	});
}

function update(req, res){

}

function destroy(req, res){
    console.log('Deleting a drink...')
    db.Drink.findByIdAndRemove(req.params.drink_id, function(err,foundDrink){
        if (err){
            console.log(err);
        }
		res.send("drink review deleted");
	});
}

module.exports = {
    index: index,
    create: create,
    show: show,
    update: update,
    destroy: destroy
}