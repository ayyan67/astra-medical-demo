import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { deidentifyData } from './utils'

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const token = await getToken({ req })
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ]
    
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an Excel or CSV file.' },
        { status: 400 }
      )
    }

    // Process the file
    const buffer = Buffer.from(await file.arrayBuffer())
    const deidentifiedData = await deidentifyData(buffer, file.type)
    
    // Create response with file
    const response = new NextResponse(deidentifiedData)
    response.headers.set('Content-Type', file.type)
    response.headers.set('Content-Disposition', `attachment; filename="deidentified_${file.name}"`)
    
    return response

  } catch (error) {
    console.error('Error processing file:', error)
    return NextResponse.json(
      { error: 'Error processing file' },
      { status: 500 }
    )
  }
}