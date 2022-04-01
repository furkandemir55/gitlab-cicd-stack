type ExampleEndpoint = "example1"
type ExampleRequestBody = undefined
type ExampleResponse = { response: string }

type ExampleEndpoint2 = "example2"
type ExampleRequest2Body = { test: string }
type ExampleResponse2 = { completed: boolean }

type ExampleEndpoint3 = "example3"
type ExampleRequest3Body = { hello: boolean }
type ExampleResponse3 = { error: boolean }

//TODO find better way to extend these types
export type ApiEndpoint = ExampleEndpoint | ExampleEndpoint2 | ExampleEndpoint3
export type ApiRequestBody<T> = T extends ExampleEndpoint ? ExampleRequestBody : T extends ExampleEndpoint2 ? ExampleRequest2Body : ExampleRequest3Body
export type ApiResponse<T> = T extends ExampleEndpoint ? ExampleResponse : T extends ExampleEndpoint2 ? ExampleResponse2 : ExampleResponse3
