import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Questions } from '../question';
import { QuizService } from '../Shared/quiz.service';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  answers: string[] = [];

  _currentQuestionType : string;

  _question : Questions[];

  _CurrentQuestion : number = 0;

  _QuestionsAnswerd : number = 0;

  message: boolean = true;

  _Started : boolean = false;

  _finished : boolean = false;

  q1: string = ''

  q2: string = ''

  constructor(private _questionservice: QuizService) { }

  questionForm = new FormGroup({
    1 : new FormControl(''),
    2 : new FormControl(''),
    3 : new FormControl(''),
    4 : new FormControl(''),
    5 : new FormControl(''),
  })

  ngOnInit(): void {
    this.getQuestions();
    this.GetLocalStorage();
    
  }

  GetLocalStorage(){
    if(localStorage.getItem("started") != null){
    this._CurrentQuestion = JSON.parse (localStorage.getItem('question'));
    this._Started = JSON.parse(localStorage.getItem('started'));
    this._QuestionsAnswerd = JSON.parse(localStorage.getItem('completed'));
    this._finished = JSON.parse(localStorage.getItem('_finished'));
  }
    for(let x =1; x < this._QuestionsAnswerd+1; x++){
    this.answers[x] = JSON.parse(localStorage.getItem('answer'+x))
    //console.log(this.answers[x]);
    }
    this.questionForm.patchValue({
      1: this.answers[1],
      2: this.answers[2],
      3: this.answers[3],
      4: this.answers[4],
      5: this.answers[5]
    })
  }

  StartQuiz(): void{
    this._Started = true;
    if(this._CurrentQuestion == 0){
    this._CurrentQuestion++;
    }
    localStorage.setItem('started',JSON.stringify(this._Started));
    localStorage.setItem('question',JSON.stringify(this._CurrentQuestion));
    localStorage.setItem('completed',JSON.stringify(this._QuestionsAnswerd));
    
  }
  nextQuestion(): void{
    //console.log(this.questionForm.get(this._CurrentQuestion.toString()).value);
      localStorage.setItem('answer'+this._CurrentQuestion.toString(),'"'+this.questionForm.get(this._CurrentQuestion.toString()).value+'"')
    if(this._CurrentQuestion < 5){
    this._CurrentQuestion++;
  }
    if(this._QuestionsAnswerd < 5){
      this._QuestionsAnswerd++;
    }
    localStorage.setItem('question',JSON.stringify(this._CurrentQuestion));
    localStorage.setItem('completed',JSON.stringify(this._QuestionsAnswerd));
    this.GetLocalStorage();
    
  }
  previousQuestion():void{
    if(this._CurrentQuestion > 1){
      this._CurrentQuestion--;
      localStorage.setItem('question',JSON.stringify(this._CurrentQuestion));
    }
  }

  getQuestions(): void {
    this._questionservice.getQuestions()
        .subscribe(questions => this._question = questions);

        }
  getQuestionid(answerId: number): boolean{
    if(answerId == this._CurrentQuestion){
      return true;
    }
  }

  checkForgivenAnswer(_answerId: number, _questionId: number): boolean{
    if(_answerId.toString() == this.answers[_questionId]){
      return true;
    }
    else{ return false;}
  }

  getQuestionType(answertype: string): boolean{
    this._currentQuestionType = answertype;
    if(this._currentQuestionType == "multiple_choice"){
      return true;
    }
  }

  submitQuiz(){
    this.nextQuestion();
    this.checkCorrect();
    this._Started = false;
    localStorage.setItem('started',JSON.stringify(this._Started));
    this._finished = true;
    localStorage.setItem('_finished',JSON.stringify(this._finished));
    
  }

  checkCorrect(){
    if(this.answers[1] == "Parlementaire democratie met constitutionele monarchie"){
      this.q1 ="Correct"
    }
    else{
      this.q1 ="Fout"
    }
    if(this.answers[4] == "Vader Abraham"){
      this.q2 ="Correct"
    }
    else{
      this.q2 ="Fout"
    }
  }

  restartQuiz(){
    localStorage.clear();
    this._finished = false;
    this._CurrentQuestion = 0;
    this._QuestionsAnswerd = 0;
    this.questionForm.patchValue({
      1:'',
      2:'',
      3:'',
      4:'',
      5:'',
    })
    this.answers[1] = '';
    this.answers[2] = '';
    this.answers[3] = '';
    this.answers[4] = '';
    this.answers[5] = '';
    this.StartQuiz();
  }
}