/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChatsQuery
// ====================================================

export interface ChatsQuery_chats_users {
  __typename: "User";
  /**
   * Id of the user
   */
  id: string;
  /**
   * fullName of the user
   */
  fullName: string;
  /**
   * displayName of the user
   */
  displayName: string | null;
  /**
   * image of the user
   */
  image: any | null;
}

export interface ChatsQuery_chats_messages_user {
  __typename: "User";
  /**
   * Id of the user
   */
  id: string;
  /**
   * fullName of the user
   */
  fullName: string;
  /**
   * displayName of the user
   */
  displayName: string | null;
  /**
   * image of the user
   */
  image: any | null;
}

export interface ChatsQuery_chats_messages {
  __typename: "Message";
  /**
   * Id of the message
   */
  id: string;
  /**
   * text of the message
   */
  text: string;
  user: ChatsQuery_chats_messages_user;
  /**
   * createdAt of the message
   */
  createdAt: any;
}

export interface ChatsQuery_chats {
  __typename: "Chat";
  /**
   * Id of the message
   */
  id: string;
  users: ChatsQuery_chats_users[];
  messages: ChatsQuery_chats_messages[];
  /**
   * createdAt of the message
   */
  createdAt: any;
}

export interface ChatsQuery {
  chats: ChatsQuery_chats[];
}
