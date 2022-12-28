export interface IPropsMenuSection{
    sectionTitle: string
    sectionSubtitle: string
    sectionButtonOption: {
        label: string
        openModal: () => void
    }
}