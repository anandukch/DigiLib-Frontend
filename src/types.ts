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
  no_of_copies:number
}

