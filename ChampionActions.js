import keyMirror from 'react/lib/keyMirror';

let ChampionActions = keyMirror({
  SET_CHAMPION: null,
  SET_QUINT: null,
  SET_MARK: null,
  SET_SEAL: null,
  SET_GLYPH: null,
  ADD_ITEM: null,
  REMOVE_ITEM_INDEX: null,
  SWAP_ITEM_INDICES: null,
  SET_ITEM_AT_INDEX: null
});

ChampionActions.setItemAtIndex = (actionContext, payload) => {
  actionContext.dispatch(ChampionActions.SET_ITEM_AT_INDEX, payload);
};


export default ChampionActions;
