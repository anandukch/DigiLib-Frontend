// create a types.ts file in the src folder and add the following code:
// Path: src/types.ts
export type Author= {
  name: string;
  description: string;
}

export type AuthorData ={
  id: string;
  name: string;
  description: string;
}

export type Book={
  ISBN:string;
  title:string;
  language:string;
  subject:string;
  publisher:string;
  author:string;
  no_of_copies:number;
  image:string;
}

export type BookData={
  id:string;
  ISBN:string;
  title:string;
  language:string;
  subject:string;
  publisher:string;
  author:string;
  no_of_copies:number;
  image:string;
  available_copies:number;
  virtual_copies:number;
}

type BookItem={
  id:string;
  book_id:string;
  acc_no:string;
  status:string;
}

export type BookTransaction={
  id:string;
  book:BookData;
  book_item:BookItem;
  user:UserData;
  date_of_issue:string;
  date_of_return:string;
  status:string;
  date_of_reservation:string;
  actual_date_of_return:string;
  fine:number;

}

type UserData={
  id:string;
  name:string;
  email:string;
}

