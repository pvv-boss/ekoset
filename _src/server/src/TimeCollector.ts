export default class TimeCollector {
    private nextId = 0
    private timeSet: Map<number, TimeSetEntry> = new Map()

    public tick (message: string) {
        this.nextId = this.nextId++;
        const value = { time: performance.now(), message }
        this.timeSet.set(this.nextId, value)
    }

    public end (message: string) {
        this.nextId = this.nextId++;
        const value = { time: performance.now(), message }
        this.timeSet.set(this.nextId, value)
    }

    // писать в файл по окончанию и обнулять начальный отсчет
    // писать тик и дельту между предыдущим

}

type TimeSetEntry = {
    time: number
    message: string
}