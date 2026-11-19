/** Enveloppe des réponses réussies du back : { success: true, data, message } */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}
