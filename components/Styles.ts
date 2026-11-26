import { StyleSheet } from "react-native"

export const COLORS = {
    bg: '#0B0B0E',
    surface: '#141419',
    surfaceElevated: '#1E1E26',
    border: '#2A2A35',
    primary: '#E50914',
    primaryDark: '#B20710',
    success: '#10B981',
    warning: '#F59E0B',
    text: '#F8FAFC',
    textMuted: '#94A3B8',
};

export const styles = StyleSheet.create({
    display: {
        fontWeight: 'bold',
        fontSize: 32,
        color: COLORS.text
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: COLORS.text
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textMuted
    },
    container: {
        padding: 16,
        paddingBottom: 36,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    primaryButton: {
        padding: 8,
        backgroundColor: COLORS.primary,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 6,
        paddingVertical: 12,
        borderRadius: 4,
        gap: 8,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButton: {
        padding: 8,
        backgroundColor: COLORS.surfaceElevated,
        borderColor: COLORS.border,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 6,
        paddingVertical: 12,
        borderRadius: 4,
        gap: 8,
    },
    secondaryButtonText: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '600',
    },
    link: {
        textDecorationLine: 'underline',
        color: '#0000ff'
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginVertical: 6,
        padding: 12,
    },
    screen: {
        flex: 1,
        backgroundColor: COLORS.bg,
        padding: 12
    },
    input: {
        backgroundColor: COLORS.surfaceElevated,
        borderColor: COLORS.border,
        color: COLORS.text,
        borderWidth: 1,
        borderRadius: 4,
        padding: 14,
        fontSize: 15,
        marginBottom: 8,
        width: '100%',
        boxSizing: 'border-box'
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    horizontalSpacer: { height: 10 },
    thumb: { width: '100%', height: 145 },
    body: { padding: 14 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    category: { color: COLORS.primary, fontSize: 12, fontWeight: '800', },
    difficulty: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },
    planTitle: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: 8 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { color: COLORS.textMuted, fontSize: 13 },
    label: { color: COLORS.text, fontSize: 13, fontWeight: '600', marginBottom: 6 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

    timerBanner: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerImage: { width: '100%', height: 170, borderRadius: 16, marginBottom: 14 },
    exerciseName: { color: COLORS.text, fontSize: 16, fontWeight: '700', flex: 1 },
    muscleTag: { color: COLORS.primary, fontSize: 12, fontWeight: '700' },
    setsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    setPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: COLORS.surfaceElevated,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    setPillDone: {
        backgroundColor: COLORS.success,
        borderColor: COLORS.success,
    },
})