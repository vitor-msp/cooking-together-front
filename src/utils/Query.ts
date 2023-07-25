import { SearchRecipesType } from "../pages/recipes";

export abstract class Query {
  static prepareQuery(state: SearchRecipesType): string {
    const {
      ingredients,
      servingsFrom,
      servingsTo,
      title,
      totalTimeInMinutesFrom,
      totalTimeInMinutesTo,
      userId,
    } = state;
    let query = "?";
    if (title) query += `title=${title}&`;
    if (servingsFrom) query += `servingsFrom=${servingsFrom}&`;
    if (servingsTo) query += `servingsTo=${servingsTo}&`;
    if (totalTimeInMinutesFrom)
      query += `totalTimeInMinutesFrom=${totalTimeInMinutesFrom}&`;
    if (totalTimeInMinutesTo)
      query += `totalTimeInMinutesTo=${totalTimeInMinutesTo}&`;
    if (ingredients) query += `ingredients=${ingredients}&`;
    if (userId) query += `userId=${userId}&`;
    return query;
  }
}
