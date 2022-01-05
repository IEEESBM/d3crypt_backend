const { Router } = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Question = require('../models/questionModel');
const res = require('express/lib/response');


const router = Router();

router.get('/check', (req, res) => {
	res.send('OK');
})

router.post('/', async (req, res) => {
	try {
		let u = await User.findById(req.body.id);
		let current = u.currentQuestion;
		console.log(u.currentQuestion);
		let cq = await Question.findOne({ index: u.questions[current] });
		console.log(cq);
		res.send(cq);
	} catch (err) {
		console.log(err);
	}
});

router.put('/hint', async (req, res) => {
	try {
		let u = await User.findById(req.body.id);
		let current = u.currentQuestion;
		console.log(u.currentQuestion);
		let cq = await Question.findOne({ index: u.questions[current] });
		
		//change hint cost here
		let hint_cost = 30;
		let pts = u.points;

		if(u.hint1_used == false){
			await User.findByIdAndUpdate(u.id, {"hint1_used" : true});
			await User.findByIdAndUpdate(u.id, {"points": (pts-hint_cost)});
			res.send(cq.hint_1);
			
		}else{
			if(u.hint2_used == false){
				await User.findByIdAndUpdate(u.id, {"hint2_used" : true});
				await User.findByIdAndUpdate(u.id, {"points" : (pts-hint_cost)});
				res.send(cq.hint_2);
			}else{
				res.send("All hints used!");
			}
		}
		console.log(u.hint1_used, u.hint2_used);
		console.log(u);
		
	} catch(err){
		console.log(err);
	}
});



router.get('/show_all', async (req, res) => {
	try {
		const questions = await Question.find();
		res.json(questions)
	} catch (err) {
		res.send("Error " + err)
	}
});

router.post('/add', async (req, res) => {
	const newq = await Question.create({
		title: req.body.title,
		difficulty: req.body.difficulty,
		answer: req.body.answer,
		index: req.body.index,
		image_1: req.body.image_1,
		image_2: req.body.image_2,
		image_3: req.body.image_3,
		image_4: req.body.image_4,
		hint_1: req.body.hint_1,
		hint_2: req.body.hint_2
	}, function (err) {
		console.log(err);
		console.log(newq);
	})
	console.log(newq);
	res.send(newq);
})


router.get('/:id', async (req, res) => {
	try {
		const question = await Question.findById(req.params.id)
		res.json(question)
	} catch (err) {
		res.send("Error " + err)
	}
})

router.patch('/:id', async (req, res) => {
	try {
		const q = await Question.findById(req.params.id)
		const data = req.body
		q.image_1 = data.image_1
		q.image_2 = data.image_2
		q.image_3 = data.image_3
		q.image_4 = data.image_4
		q.question = data.question
		q.difficulty = data.difficulty
		q.points = data.points
		q.answer = data.answer
		q.hint = data.hint
		const a1 = await q.save()
		res.json(a1)
	} catch (err) {
		res.send("Error " + err)
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const question = await Question.findById(req.params.id)
		const a1 = await question.remove()
		res.send('Removed')
	} catch (err) {
		res.send("Error " + err)
	}
})


module.exports = router;

