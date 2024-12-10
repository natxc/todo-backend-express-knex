exports.seed = async function (knex) {
    await knex('issues').del();
    await knex('issues').insert([
        {
            title: 'Fix login bug',
            description: 'User cannot log in with special characters in username',
            status: 'Open',
            priority: 'High',
            project_id: 1,
            reported_by: 1,
            assigned_to: 2,
            due_date: new Date('2024-12-15'),
        },
        {
            title: 'Improve dashboard loading',
            description: 'Dashboard takes too long to load on slow connections',
            status: 'In Progress',
            priority: 'Medium',
            project_id: 2,
            reported_by: 2,
            assigned_to: 3,
            due_date: new Date('2024-12-20'),
        },
    ]);
};
