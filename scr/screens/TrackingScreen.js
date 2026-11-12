
    import React, { useState, useCallback } from 'react';

    import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    } from 'react-native';

    import TrackingMap from './TrackingMap';

    const ORANGE = '#FF6600';

    export default function TrackingScreen({ order, onBack }) {
    const [progress, setProgress] = useState(0);

    const atualizarProgresso = useCallback((value) => {
        setProgress(value);
    }, []);

    const entregue = progress >= 1;

    return (
        <ScrollView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
            <Text style={styles.back}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Acompanhar pedido</Text>
        </View>

        <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>STATUS DA ENTREGA</Text>

            <Text style={styles.status}>
            {entregue
                ? 'Pedido entregue! 🎉'
                : progress > 0
                ? 'Entregador a caminho 🛵'
                : 'Pedido saiu para entrega'}
            </Text>

            <Text style={styles.description}>
            {entregue
                ? 'Sua pizza chegou ao destino!'
                : 'Acompanhe a movimentação do entregador no mapa.'}
            </Text>

            <View style={styles.progressBackground}>
            <View
                style={[
                styles.progressBar,
                { width: `${progress * 100}%` },
                ]}
            />
            </View>

            <Text style={styles.progressText}>
            {Math.round(progress * 100)}% do percurso demonstrativo
            </Text>
        </View>

        <Text style={styles.sectionTitle}>
            Localização do entregador
        </Text>

        <View style={styles.mapContainer}>
            <TrackingMap onProgress={atualizarProgresso} />
        </View>

        <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
            📦 Informações do pedido
            </Text>

            <Text style={styles.info}>
            Pedido: #{order?.id || 'DEMONSTRAÇÃO'}
            </Text>

            <Text style={styles.info}>
            Cliente: {order?.customer?.name || 'Cliente'}
            </Text>

            <Text style={styles.info}>
            Endereço: {order?.address || 'Endereço demonstrativo'}
            </Text>

            <Text style={styles.info}>
            Total: {Number(order?.total || 0).toLocaleString(
                'pt-BR',
                { style: 'currency', currency: 'BRL' }
            )}
            </Text>
        </View>

        <View style={styles.notice}>
            <Text style={styles.noticeText}>
            Demonstração acadêmica: a posição do entregador é
            simulada automaticamente. Não representa GPS real.
            </Text>
        </View>
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        padding: 18,
    },

    header: {
        marginBottom: 20,
    },

    back: {
        color: ORANGE,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 15,
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
        color: '#222',
    },

    statusCard: {
        backgroundColor: '#222',
        borderRadius: 16,
        padding: 20,
        marginBottom: 22,
    },

    statusLabel: {
        color: '#BBBBBB',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

    status: {
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: '900',
        marginTop: 10,
    },

    description: {
        color: '#DDDDDD',
        marginTop: 8,
        lineHeight: 21,
    },

    progressBackground: {
        height: 9,
        backgroundColor: '#555',
        borderRadius: 10,
        marginTop: 20,
        overflow: 'hidden',
    },

    progressBar: {
        height: 9,
        backgroundColor: ORANGE,
        borderRadius: 10,
    },

    progressText: {
        color: '#FFFFFF',
        marginTop: 9,
        fontSize: 12,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: '900',
        marginBottom: 12,
        color: '#222',
    },

    mapContainer: {
        height: 380,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: '#DDD',
    },

    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 18,
        marginBottom: 15,
    },

    infoTitle: {
        fontSize: 17,
        fontWeight: '900',
        marginBottom: 12,
        color: '#222',
    },

    info: {
        color: '#555',
        marginTop: 8,
        lineHeight: 21,
    },

    notice: {
        backgroundColor: '#FFF0E6',
        padding: 15,
        borderRadius: 12,
        marginBottom: 30,
    },

    noticeText: {
        color: '#8A3D0B',
        fontSize: 12,
        lineHeight: 19,
    },
    });
