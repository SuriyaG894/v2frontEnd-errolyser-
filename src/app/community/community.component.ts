import { Component } from '@angular/core';
import { Question } from '../question';
import { CommunityService } from '../services/community.service';
import { Answer } from '../answer';
import { Reply } from '../reply';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { Router } from 'express';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-community',
  imports: [CommonModule,FormsModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent {

  questionText: string = '';
  questions: Question[] = [];
  username:any='';
  likedAnswers: Set<number> = new Set();
  likedQuestions: Set<number> = new Set();
  likedReplies: Set<number> = new Set();
  searchText:string='';

  aList:any = []
  aLikes = 0
  qList:any = []
  qLikes = 0
  rList:any = []
  rLikes = 0
  repies:any

  commentTexts: { [key: number]: string } = {};
  showCommentBox: { [key: number]: boolean } = {};

  replyTexts: { [key: number]: string } = {};
  showReplyBox: { [key: number]: boolean } = {};
  replies: any;

  constructor(private service: CommunityService,private router:Router) {
  }

  ngOnInit(): void {
    this.loadQuestions();
    this.username = localStorage.getItem('token');
    const likedAnswers = localStorage.getItem('likedAnswers');
  if (likedAnswers) {
    this.likedAnswers = new Set(JSON.parse(likedAnswers));
  }
    const likedQuestions = localStorage.getItem('likedQuestions');
  if (likedQuestions) {
    this.likedQuestions = new Set(JSON.parse(likedQuestions));
  }
    const likedReplies = localStorage.getItem('likedReplies');
  if (likedReplies) {
    this.likedReplies = new Set(JSON.parse(likedReplies));
  }
  }



  loadQuestions() {
    this.service.getAllQuestions().subscribe(data => {
      this.questions = data; 
    });
  }

  filterQuestions():Question[]{
    return this.questions.filter(question=>
      question.text.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }

  submitQuestion() {
    const questionEntered: Question = {
      id: 0, 
      text: this.questionText,
      username: this.username,
      likes: 0,
      answers: []
    };

    this.service.addQuestion(questionEntered).subscribe(newQuestion => {
      this.questions.unshift(newQuestion);
      this.questionText = '';
    });
  }


  toggleCommentBox(questionId: number | undefined) {
    if (questionId !== undefined) {
      this.showCommentBox[questionId] = !this.showCommentBox[questionId];
    }
  }


  submitComment(question: Question) {
  
    if (question.id === undefined) {
      console.error('Invalid question ID');
      return; 
    }

    
    const commentText = this.commentTexts[question.id] || '';
    
    if (!commentText) return;

    const newComment: Answer = {
      id: 0, 
      text: commentText,
      username: this.username, 
      likes: 0,
      replies: [], 
      question: question
    };

   
    this.service.addAnswerToQuestion(question.id, newComment).subscribe(updatedQuestion => {
      
      const index = this.questions.findIndex(q => q.id === question.id);
      if (index !== -1) {
        this.questions[index] = updatedQuestion; 
      }
      if (question.id !== undefined) {
        this.commentTexts[question.id] = '';
        this.showCommentBox[question.id] = false;
      }
    });
  }

  toggleReplyBox(commentId: number | undefined) {
    if (commentId !== undefined) {
      this.showReplyBox[commentId] = !this.showReplyBox[commentId];
    }
  }

  
  submitReply(questionId: number | undefined, comment: Answer) {
    if (questionId === undefined || comment.id === undefined) {
      console.error('Invalid question ID or comment ID');
      return;
    }

    const replyText = this.replyTexts[comment.id];
    if (!replyText) return;

    const newReply: Reply = {
      id: 0,
      text: replyText,
      username: this.username,
      likes: 0,
      answer: comment
    };

    
    this.service.addRepliesToAnswer(questionId, comment.id, [newReply]).subscribe(updatedAnswer => {
      this.loadQuestions();
      
      this.replyTexts[comment.id] = '';
      this.showReplyBox[comment.id] = false;
    });
  }


  increaseQuestionLike(id:any,likes:any,username:any){
    if (!(this.likedQuestions.has(username) && this.likedQuestions.has(id))) {
    this.service.addLikesToQuestion(id,likes).subscribe(data=>{
       this.qList = data as Question;
       this.qLikes = this.qList.likes;
       this.likedQuestions.add(username);
       this.likedQuestions.add(id);
       localStorage.setItem('likedQuestions', JSON.stringify(Array.from(this.likedQuestions)));
       this.loadQuestions();
    });
  }
  }
  increaseAnswerLike(answerId: number, likes: number,username:any) {
    if (!(this.likedAnswers.has(username) && this.likedAnswers.has(answerId))) {
      this.service.addLikesToAnswer(answerId, likes).subscribe(data => {
        this.aList = data as Answer;
        this.aLikes = this.aList.likes;
        this.likedAnswers.add(username);
        this.likedAnswers.add(answerId);
        localStorage.setItem('likedAnswers', JSON.stringify(Array.from(this.likedAnswers)));
        this.loadQuestions();
      });
    }
  }

  
  increaseReplyLike(id:any,likes:any,username:any){
    if (!(this.likedReplies.has(username)&& this.likedReplies.has(id))) {
    this.service.addLikesToReply(id,likes).subscribe(data=>{
      this.rList = data as Reply;
       this.rLikes = this.rList.likes;
       this.likedReplies.add(username);
       this.likedReplies.add(id);
       localStorage.setItem('likedReplies', JSON.stringify(Array.from(this.likedReplies)));
       this.loadQuestions();
    })
  }
  }


}