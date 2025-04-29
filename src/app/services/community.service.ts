import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../question';
import { Observable } from 'rxjs';
import { Answer } from '../answer';
import { Reply } from '../reply';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  constructor(private http:HttpClient) { }

  baseUrl:string="http://localhost:8080"

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/getAllQuestions`);
  }

  // Get question by ID
  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/getQuestionById/${id}`);
  }

  // Add a new question
  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/addQuestion`, question);
  }

  // Update a question
  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/updateQuestion/${id}`, question);
  }

  // Delete a question
  deleteQuestion(id: number): Observable<Question> {
    return this.http.delete<Question>(`${this.baseUrl}/deleteQuestion/${id}`);
  }

  // Add an answer to a question
  addAnswerToQuestion(questionId: number, answer: Answer): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/mapAnswerToQuestion/${questionId}`, answer);
  }


  getAllAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.baseUrl}/getAllAnswers`);
  }

  // Get answer by ID
  getAnswerById(id: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.baseUrl}/getAnswerById/${id}`);
  }

  // Add a new answer
  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.baseUrl}/addAnswer`, answer);
  }

  // Update an answer
  updateAnswer(id: number, answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(`${this.baseUrl}/updateAnswer/${id}`, answer);
  }

  // Delete an answer
  deleteAnswer(id: number): Observable<Answer> {
    return this.http.delete<Answer>(`${this.baseUrl}/deleteAnswer/${id}`);
  }

  // Add replies to an answer
  addRepliesToAnswer(questionId:number,answerId: number, replies: Reply[]): Observable<Answer> {
    return this.http.post<Answer>(`${this.baseUrl}/mapReplyToAnswer/${answerId}`, replies);
  }

  addLikesToQuestion(questionId:any,likes:any){
    return this.http.post(`${this.baseUrl}/mapLikesToQuestion/${questionId}`,likes);
  }

  // Add likes to an answer
  addLikesToAnswer(answerId: number, likes: number): Observable<Answer> {
    return this.http.post<Answer>(`${this.baseUrl}/mapLikesToAnswer/${answerId}`, likes);
  }

  addLikesToReply(replyId:any,likes:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/addLikesToReply/${replyId}`,likes);
  }


  // Get all replies
  getAllReplies(): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${this.baseUrl}/getAllReplies`);
  }

  // Get reply by ID
  getReplyById(id: number): Observable<Reply> {
    return this.http.get<Reply>(`${this.baseUrl}/getReplyById/${id}`);
  }

  // Add a new reply
  addReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(`${this.baseUrl}/addReply`, reply);
  }

  // Update a reply
  updateReply(id: number, reply: Reply): Observable<Reply> {
    return this.http.put<Reply>(`${this.baseUrl}/updateReply/${id}`, reply);
  }

  // Delete a reply
  deleteReply(id: number): Observable<Reply> {
    return this.http.delete<Reply>(`${this.baseUrl}/deleteReply/${id}`);
  }
}
