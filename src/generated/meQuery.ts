/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me {
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
   * email of the user
   */
  email: any;
  /**
   * image of the user
   */
  image: any | null;
}

export interface meQuery {
  me: meQuery_me | null;
}
