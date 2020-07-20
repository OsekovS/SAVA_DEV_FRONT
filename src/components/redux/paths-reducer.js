let initialState = {};

export const pathsReducer = (state = initialState, action) => {
   switch (action.type) {
       case 'UPDATE_APP_PATHS':
            let stateCopy = {...state}
           let modules = action.modules, paths={},sidebar
        for (const ModuleKey in modules) {
            if (modules.hasOwnProperty(ModuleKey)) {
              let indexes = modules[ModuleKey].indexes
              paths[ModuleKey] = {}
              for (const IndexKey in indexes) {
                if (indexes.hasOwnProperty(IndexKey)) {
                    sidebar = indexes[IndexKey].sidebar
                    paths[ModuleKey][IndexKey] = sidebar.to
                }
              }
            }
          }
          stateCopy = paths
        //    console.log(paths)
            return stateCopy;
       default:
           return state;
   }
}


export const updatePaths = (modules) => {
    return {type: 'UPDATE_APP_PATHS', modules}
}

export default pathsReducer;