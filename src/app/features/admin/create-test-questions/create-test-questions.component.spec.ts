import { CreateTestQuestionsComponent } from './create-test-questions.component';

describe('CreateTestQuestionsComponent Word import', () => {
  let component: CreateTestQuestionsComponent;

  beforeEach(() => {
    component = new CreateTestQuestionsComponent(
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any
    );
  });

  it('matches MCSA option text after trimming and lowercasing', () => {
    const question = (component as any).toQuestion({
      text: 'What is the main purpose of a Control Plan?',
      type: 'MCSA',
      subject: '',
      topic: '',
      difficulty: 'Easy',
      answer: '  a control plan identifies controls, inspection methods, and reaction plans.  ',
      expectedAnswer: '',
      explanation: '',
      marks: '1',
      options: [
        { id: 'A', text: 'Another answer' },
        { id: 'D', text: 'A Control Plan identifies controls, inspection methods, and reaction plans.' }
      ]
    }, 0);

    expect(question.correctOptionIds).toEqual(['d']);
    expect(question.validationErrors).toEqual([]);
  });

  it('uses # to separate MCMA answers without splitting commas inside option text', () => {
    const question = (component as any).toQuestion({
      text: 'Select the applicable statements.',
      type: 'MCMA',
      subject: '',
      topic: '',
      difficulty: 'Easy',
      answer: 'MSA # Controls, frequencies, and reaction plans',
      expectedAnswer: '',
      explanation: '',
      marks: '1',
      options: [
        { id: 'A', text: 'APQP' },
        { id: 'B', text: 'MSA' },
        { id: 'C', text: 'PPAP' },
        { id: 'D', text: 'Controls, frequencies, and reaction plans' }
      ]
    }, 0);

    expect(question.correctOptionIds).toEqual(['b', 'd']);
    expect(question.validationErrors).toEqual([]);
  });
});
