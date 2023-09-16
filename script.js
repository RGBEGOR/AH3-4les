


function randColor() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

return `rgb(${r},${g},${b})`
}
console.log(randColor());

let arheo = document.querySelectorAll('.arheo')
let info = document.querySelectorAll('.info')


for (let i = 0; i < arheo.length; i++) { 
	arheo[i].addEventListener('click', function () {
	arheo[i].style.background = randColor()
    
  })

    info[i].addEventListener('click',function () {
    info[i].style.background = randColor() 
  } )
    
}



let arheo_1 = document.querySelectorAll('.arheo_1')
let arheo_2 = document.querySelectorAll('.arheo_2')

for (let i = 0; i < arheo_1.length; i++) { 
	arheo_1[i].addEventListener('click', function () {
	arheo_1[i].style.background = randColor()
    
  })

    arheo_2[i].addEventListener('click',function () {
    arheo_2[i].style.background = randColor() 
  } )  

}





const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 2),
	new Result("Ваш уровень выше среднего", 3),
	new Result("Поздравляем Вы успешно усвоили эту тему", 4)
];


const questions = 
[
	new Question(" Этот период  каменного века датируеться (12тыс - 7 тыс до н.э) представляет собой временной отрезок между палеолитом и неолитом.", 
	[
		new Answer('Неолит', 0),
		new Answer("Энеолит ", 0),
		new Answer("Палеолит", 0),
		new Answer("Мезолит", 1)
	]),
	new Question("  Этот  период (7-5 тыс до н.э ) называют  завершающим периодом каменного века и появлением  металлических изделиямй.", 
	[
		new Answer('Неолит', 1),
		new Answer("Энеолит", 0),
		new Answer("Палеолит ", 0),
		new Answer("Мезолит", 0)
	]),
	new Question(" Эта эпоха охватывают период 2800–900 лет до н. э. Именно тогда люди научились делать изделия и орудия труда из сплавов  олова и меди", 
	[
		new Answer('Железный век ', 0),
		new Answer("Энеолит", 0),
		new Answer("Неолит", 0),
		new Answer("Бронза", 1)
	]),
	new Question("Мелкое  остроконечное  орудие из камня в древности еще называют ", 
	[
		new Answer('Галька ', 0),
		new Answer("Микролит", 1),
		new Answer("Неолит", 0),
		new Answer("Макролит", 0)
	]),
	new Question("Селенгур и Кальбулак это?", 
	[
		new Answer('пещеры периода паеолита  в Узбекистане ', 1),
		new Answer("Наскальные рисунки Франции ", 0),
		new Answer("Первобытные люди ", 0),
		new Answer("такие пещеры в Испании", 0)

	]),

];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}

	setTimeout(Update, 1000);
}

