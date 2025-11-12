

// module.exports = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'E-Test Platform API',
//       version: '2.0.0',
//       description: 'API for E-Test Platform (MCQ Exam System)',
//       contact: {
//         name: 'API Support',
//         email: 'support@etest.com'
//       }
//     },
//     servers: [
//       {
//         url: process.env.API_URL || 'http://localhost:3000',
//         description: 'Development server'
//       }
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT'
//         }
//       },
//       schemas: {
//         User: {
//           type: 'object',
//           properties: {
//             id: { type: 'integer' },
//             email: { type: 'string', format: 'email' },
//             name: { type: 'string' },
//             role: { type: 'string', enum: ['User', 'Admin'] },
//             exam_target: { type: 'string' }
//           }
//         },
//         Exam: {
//           type: 'object',
//           properties: {
//             id: { type: 'integer' },
//             name: { type: 'string' },
//             duration_min: { type: 'integer' },
//             positive_marks: { type: 'number' },
//             negative_marks: { type: 'number' },
//             unanswered_marks: { type: 'number' }
//           }
//         },
//         Question: {
//           type: 'object',
//           properties: {
//             id: { type: 'integer' },
//             exam_id: { type: 'integer' },
//             topic: { type: 'string' },
//             question_text: { type: 'string' },
//             options: { type: 'array', items: { type: 'string' } },
//             correct_index: { type: 'integer' },
//             explanation: { type: 'string' }
//           }
//         },
//         Attempt: {
//           type: 'object',
//           properties: {
//             id: { type: 'integer' },
//             user_id: { type: 'integer' },
//             exam_id: { type: 'integer' },
//             start_time: { type: 'string', format: 'date-time' },
//             end_time: { type: 'string', format: 'date-time' },
//             score: { type: 'number' },
//             status: { type: 'string', enum: ['InProgress', 'Completed', 'Expired'] }
//           }
//         },
//         Answer: {
//           type: 'object',
//           properties: {
//             id: { type: 'integer' },
//             attempt_id: { type: 'integer' },
//             question_id: { type: 'integer' },
//             selected_option_index: { type: 'integer' },
//             is_correct: { type: 'boolean' }
//           }
//         },
//         Error: {
//           type: 'object',
//           properties: {
//             success: { type: 'boolean', example: false },
//             message: { type: 'string' },
//             error: { type: 'string' }
//           }
//         }
//       }
//     }
//   },
//   apis: ['./src/infrastructure/routes/*.js']
// };


module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Test Platform API',
      version: '2.0.0',
      description: 'API for E-Test Platform (MCQ Exam System)',
      contact: {
        name: 'API Support',
        email: 'support@etest.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            role: { type: 'string', enum: ['User', 'Admin'] },
            exam_target: { type: 'string' }
          }
        },
        Exam: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            duration_min: { type: 'integer' },
            positive_marks: { type: 'number' },
            negative_marks: { type: 'number' },
            unanswered_marks: { type: 'number' }
          }
        },
        Question: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            exam_id: { type: 'integer' },
            topic: { type: 'string' },
            question_text: { type: 'string' },
            options: { type: 'array', items: { type: 'string' } },
            correct_index: { type: 'integer' },
            explanation: { type: 'string' }
          }
        },
        Attempt: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            user_id: { type: 'integer' },
            exam_id: { type: 'integer' },
            start_time: { type: 'string', format: 'date-time' },
            end_time: { type: 'string', format: 'date-time' },
            score: { type: 'number' },
            status: { type: 'string', enum: ['InProgress', 'Completed', 'Expired'] }
          }
        },
        Answer: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            attempt_id: { type: 'integer' },
            question_id: { type: 'integer' },
            selected_option_index: { type: 'integer' },
            is_correct: { type: 'boolean' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            error: { type: 'string' }
          }
        }
      }
    },
    tags: [
      // {
      //   name: 'User',
      //   description: 'User management operations'
      // },
      {
        name: 'Admin',
        description: 'Admin operations'
      },
      {
        name: 'Test',
        description: 'Test taking operations'
      }
    ]
  },
  apis: [
    './src/infrastructure/routes/userRoutes.js',
    './src/infrastructure/routes/adminRoutes.js',
    './src/infrastructure/routes/testRoutes.js'
  ]
};