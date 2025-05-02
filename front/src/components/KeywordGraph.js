// ✅ KeywordGraph.js — 중심 노드 고정 + 타입별 색상 + 자연스러운 cose 배치
import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

const KeywordGraph = ({ data }) => {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  const initGraph = () => {
    const container = containerRef.current;
    if (!container || !data?.nodes?.length) return;

    if (container.offsetWidth === 0 || container.offsetHeight === 0) {
      setTimeout(initGraph, 100);
      return;
    }

    try {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }

      // 중심 노드 지정
      const centralKeyword = "초코 생크림 케이크";
      const elements = [];

      for (const node of data.nodes) {
        const nodeData = {
          data: { id: node.id, label: node.id },
          classes: node.type?.toLowerCase() || '',
        };

        // 중심 노드는 고정 위치 설정
        if (node.id === centralKeyword) {
          nodeData.position = { x: 0, y: 0 };
          nodeData.locked = true;
        }

        elements.push(nodeData);
      }

      for (const edge of data.edges) {
        elements.push({
          data: {
            source: edge.source,
            target: edge.target,
            label: edge.label || "",
          },
        });
      }

      // Cytoscape 초기화
      cyRef.current = cytoscape({
        container,
        elements,
        style: [
          {
            selector: 'node',
            style: {
              label: 'data(label)',
              'text-valign': 'center',
              'text-halign': 'center',
              'color': '#000',
              'font-size': 14,
              'font-weight': 'bold',
              'width': 50,
              'height': 50,
            },
          },
          { selector: 'node.keyword', style: { 'background-color': '#64b5f6' } },   // 파랑
          { selector: 'node.tag', style: { 'background-color': '#81c784' } },       // 초록
          { selector: 'node.category', style: { 'background-color': '#ffb74d' } },  // 주황
          { selector: 'node.season', style: { 'background-color': '#ba68c8' } },    // 보라
          { selector: 'node.combo', style: { 'background-color': '#4dd0e1' } },     // 청록
          { selector: 'node.example', style: { 'background-color': '#e57373' } },   // 빨강
          { selector: 'node.ingredient', style: { 'background-color': '#a1887f' } },// 갈색
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#bbb',
              'target-arrow-color': '#bbb',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
            },
          },
        ],
        layout: {
            name: 'cose',
            animate: true,
            fit: true,
            padding: 150,               // 전체 그래프 여백
            nodeRepulsion: 300000,     // 💥 노드 간 밀어내는 힘 증가
            idealEdgeLength: 150,      // 간선 길이 증가 → 노드 간 거리 증가
            edgeElasticity: 150,       // 간선의 탄성 (느슨하게)
            nestingFactor: 1.2,
            gravity: 0.5,
            numIter: 3000,             // 💡 반복 횟수 증가 → 더 정교하게 배치
            initialTemp: 300,          // 초기 에너지
            coolingFactor: 0.95,       // 서서히 식혀서 안정화
            nodeDimensionsIncludeLabels: true, // 💬 라벨 포함하여 간격 계산
          },
        minZoom: 0.5,
        maxZoom: 4,
        wheelSensitivity: 0.2,
      });
    } catch (err) {
      console.error("❌ Cytoscape 초기화 중 오류:", err);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(initGraph, 0);

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
      clearTimeout(timeoutId);
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default KeywordGraph;
