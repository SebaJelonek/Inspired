import * as grpc from '@grpc/grpc-js'
import { JwtGenerateRequest, JwtGenerateResponse, JwtValidateRequest, JwtValidateResponse, MediaServiceClient } from 'app/gen/proto/media/v1/auth_media'


export function createAuthMediaClient(goAddress: string){
  const client = new MediaServiceClient(goAddress, grpc.credentials.createInsecure())


  return {
    jwtValidate: (req: JwtValidateRequest): Promise<JwtValidateResponse> => {
      return new Promise((resolve, reject) => {
        client.jwtValidate(req, (err, response) => {
          if (err) return reject(err);
          resolve(response)
        })
      }
    )
    },

    jwtGenerate: (req: JwtGenerateRequest): Promise<JwtGenerateResponse> => {
      return new Promise((resolve, reject) => {
        client.jwtGenerate(req, (err, response) => {
          if (err) return reject(err)
          resolve(response)
        })
      })
  }}
}

export type MediaAuthClient = ReturnType<typeof createAuthMediaClient>
