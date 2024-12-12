exports.seed = async function (knex) {
    const user = await knex('users').first();
    if (!user) {
        console.error('No users found in the database. Seed failed.');
        return;
    }

    await knex('teams').update({ user_id: user.user_id });
    console.log('All teams assigned to the first user:', user.name);
};
