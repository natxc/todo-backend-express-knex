const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'API documentation for the Todo application',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['name', 'email'],
                    properties: {
                        user_id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john.doe@example.com' },
                    },
                },
                Team: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        team_id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Web Infra' },
                    },
                },
                Project: {
                    type: 'object',
                    required: ['name', 'team_id'],
                    properties: {
                        project_id: { type: 'integer', example: 1 },
                        team_id: { type: 'integer', example: 1 },
                        name: { type: 'string', example: 'Web Development' },
                    },
                },
                Issue: {
                    type: 'object',
                    required: ['title', 'description'],
                    properties: {
                        issue_id: { type: 'integer', example: 1 },
                        project_id: { type: 'integer', example: 1 },
                        title: { type: 'string', example: 'Bug in login system' },
                        description: { type: 'string', example: 'Users cannot log in with valid credentials.' },
                        status: {
                            type: 'string',
                            enum: ['Open', 'In Progress', 'Closed'],
                            example: 'Open',
                        },
                        priority: {
                            type: 'string',
                            enum: ['Low', 'Medium', 'High'],
                            example: 'Medium',
                        },
                        reported_by: { type: 'integer', example: 1 },
                        assigned_to: { type: 'integer', example: 1 },
                    },
                },
                Comment: {
                    type: 'object',
                    required: ['content'],
                    properties: {
                        comment_id: { type: 'integer', example: 1 },
                        issue_id: { type: 'integer', example: 1 },
                        content: { type: 'string', example: 'This was a hard bug to solve.' },
                        author_id: { type: 'integer', example: 1 },
                    },
                },
            },
        },
    },
    apis: ['../server/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;