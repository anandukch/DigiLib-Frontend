// create a types.ts file in the src folder and add the following code:
// Path: src/types.ts
// export type Author= {
//   name: string;
//   description: string;
// }

// export type AuthorData ={
//   id: string;
//   name: string;
//   description: string;
// }
export type Book={
  ISBN:string;
  title:string;
  subject:string;
  description:string;
  publisher:string;
  author:string;
  no_of_copies:number;
  image:Image;
  semester:number;
}

type Image={
  url:string;
  public_id:string;
}

export type BookData={
  id:string;
  ISBN:string;
  title:string;
  description:string;
  publisher:string;
  author:string;
  no_of_copies:number;
  image:Image;
  available_copies:number;
  virtual_copies:number;
  subject:string;
  semester:number;
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
  user:UserDataTrans;
  date_of_issue:string;
  date_of_return:string;
  status:string;
  date_of_reservation:string;
  actual_date_of_return:string;
  fine:number;

}

type UserDataTrans={
  id:string;
  name:string;
  email:string;
}

export type UserData={
  id:string;
  name:string;
  email:string;
  role:string;
  verified:boolean;
}


export type LibConfigType={
  fine_rate:number;
  days_of_return:number;
}

