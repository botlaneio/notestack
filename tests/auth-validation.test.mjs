import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAuthForm,authUnavailableMessages} from '../src/lib/auth-validation.ts';
const empty={name:'',email:'',password:''};

test('sign up validates name, email and password',()=>{
 assert.deepEqual(Object.keys(validateAuthForm('sign-up',empty)),['name','email','password']);
 assert.match(validateAuthForm('sign-up',{name:'Student',email:'student@example.com',password:'short'}).password,/8 characters/);
 assert.deepEqual(validateAuthForm('sign-up',{name:'ಶಿವ',email:' student@example.com ',password:'study passphrase'}),{});
});
test('sign in requires credentials but does not impose new-password rules',()=>{
 assert.deepEqual(Object.keys(validateAuthForm('sign-in',empty)),['email','password']);
 assert.deepEqual(validateAuthForm('sign-in',{...empty,email:'student@example.com',password:'old'}),{});
 assert.match(validateAuthForm('sign-in',{...empty,email:'student@',password:'password'}).email,/valid email/);
});
test('password recovery only requires a valid email',()=>{
 assert.deepEqual(Object.keys(validateAuthForm('forgot-password',empty)),['email']);
 assert.deepEqual(validateAuthForm('forgot-password',{...empty,email:'student@example.com'}),{});
});
test('password reset never pretends an email was sent',()=>{
 assert.match(authUnavailableMessages['forgot-password'],/No reset email has been sent/);
});
