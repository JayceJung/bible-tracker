import React, { useEffect, useState } from 'react'
import { books } from './const'
import Select, { SelectChangeEvent } from '@mui/material/Select/Select'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import './App.css'
import FormControl from '@mui/material/FormControl/FormControl'
import { Card, CardContent, FormHelperText } from '@mui/material'

function App() {
    const [book, setBook] = useState('ge')
    const [chapter, setChapter] = useState('1')
    const [data, setData] = useState({ __html: '' })

    const getChapters = (book: string) => {
        return books.find((bookName) => bookName.name === book)?.chapters
    }

    const allChapters: number[] = Array.from(
        // @ts-ignore
        { length: getChapters(book) },
        (_, index) => index + 1
    )

    useEffect(() => {
        setChapter('1')
    }, [book])

    useEffect(() => {
        async function fetchBook() {
            console.log({ book })
            let response
            response = await fetch(
                `http://localhost:8080/quote.php?kor=kor&book=${book}&verseRange=${chapter}`,
                { mode: 'cors' }
            )
            const res = await response.text()
            return { __html: res }
        }
        fetchBook().then((res) => setData(res))
        console.log(allChapters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chapter, book])

    const handleBookChange = (event: SelectChangeEvent) => {
        setBook(event.target.value)
    }
    const handleChapterChange = (event: SelectChangeEvent) => {
        setChapter(event.target.value)
    }

    return (
        <div className="App">
            <div>
                <FormControl variant="standard" sx={{ m: 3, minWidth: 100 }}>
                    <FormHelperText>책</FormHelperText>
                    <Select value={book} label="책" onChange={handleBookChange}>
                        {books.map((book) => {
                            return (
                                <MenuItem value={book.name}>
                                    {book.translation}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 3, minWidth: 100 }}>
                    <FormHelperText>장</FormHelperText>
                    <Select
                        value={chapter.toString()}
                        label="장"
                        onChange={handleChapterChange}
                    >
                        {allChapters.map((chapter) => {
                            return (
                                <MenuItem value={chapter}>{chapter}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
            <Card variant="outlined" sx={{ maxWidth: '60%' }}>
                <CardContent>
                    <div
                        dangerouslySetInnerHTML={data}
                        style={{ textAlign: 'left', lineHeight: 2 }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default App
