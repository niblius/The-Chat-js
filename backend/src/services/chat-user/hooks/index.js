'use strict';

const globalHooks = require('../../../hooks');
const auth = require('feathers-authentication').hooks;
const validFindQuery = require('./validFindQuery');
const onlyRole = require('./onlyRole');
const validPatchQuery = require('./validPatchQuery');
const chatExistsAndFreeToJoin = require('./chatExistsAndFreeToJoin');
const cannotSetRole = require('./cannotSetRole');
const notJoinedAlready = require('./notJoinedAlready');
const setUserIdIfExternal = require('./setUserIdIfExternal');
const populateAssociations = require('./populateAssociations');

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [validFindQuery(), populateAssociations()],
  patch: [
    globalHooks.restrictToChatAdmin(),
    onlyRole(),
    validPatchQuery()
  ],
  create: [
    chatExistsAndFreeToJoin(),
    setUserIdIfExternal(),
    cannotSetRole(),
    notJoinedAlready(),  // TODO allow multiple, different roles
  ],
  remove: [globalHooks.restrictToChatAdmin()]
};

exports.after = {
  all: [],
  find: [],
  patch: [],
  create: [populateAssociations()],
  remove: []
};
