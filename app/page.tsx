'use client';

import { useState } from 'react';
import { Shield, Skull, PhoneOff, MapPinOff, Clock, Smartphone, Trash2, HeartPulse } from 'lucide-react';
import { MOCK_STATE } from '@/lib/store';
import styles from './page.module.css';

export default function GhostApp() {
  const [state, setState] = useState(MOCK_STATE);
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosStatus, setSosStatus] = useState<'idle' | 'waiting' | 'approved'>('idle');

  const triggerPossession = (curseType: 'glitch' | 'latency' | 'fake_call') => {
    setState(s => ({ ...s, isPossessed: true, activeCurse: curseType, safeZone: false }));
    if (curseType === 'fake_call') {
      setTimeout(() => setShowFakeCall(true), 1500);
    }
  };

  const handleSosRequest = () => {
    setSosStatus('waiting');
    // Simulate remote approval after 3 seconds
    setTimeout(() => {
      setSosStatus('approved');
      setTimeout(() => {
        setState(s => ({ ...s, isPossessed: false, activeCurse: 'none', safeZone: true }));
        setShowSosModal(false);
        setSosStatus('idle');
      }, 2000);
    }, 3000);
  };

  const simulateUninstall = () => {
    alert("SYSTEM CURSE ACTIVATED\n성실도 포인트가 모두 소멸되었습니다. \n지정된 감시자에게 학업 포기 알림이 전송되었습니다.");
    setState(s => ({ ...s, score: 0 }));
  };

  const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;

  return (
    <main className={`${styles.main} ${state.activeCurse === 'latency' ? styles.latency : ''}`}>
      {state.activeCurse === 'glitch' && <div className="noise-overlay" />}

      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Skull size={24} color={state.isPossessed ? 'var(--secondary)' : 'var(--primary)'} />
          <h1 className={state.isPossessed ? 'glitch' : ''} data-text="GHOST">GHOST</h1>
        </div>
        <div className={styles.scoreWrap}>
          <span>성실도</span>
          <strong>{state.score} pt</strong>
        </div>
      </header>

      <section className={styles.statusSection}>
        <div className={`card ${styles.statusCard} ${!state.safeZone ? styles.dangerBorder : ''}`}>
          <div className={styles.statusHeader}>
            <h3>현재 상태</h3>
            {state.isPossessed ? (
              <span className="badge badge-danger">빙의됨 (저주 발동)</span>
            ) : (
              <span className="badge badge-success">세이프존 (보호됨)</span>
            )}
          </div>
          <div className={styles.statusDetails}>
            <div className={styles.detailItem}>
              <Clock size={16} /> <span>남은 스크린 타임: {formatTime(state.screenTimeLeft)}</span>
            </div>
            <div className={styles.detailItem}>
              <MapPinOff size={16} /> <span>위치: 도서관 (안전)</span>
            </div>
          </div>
        </div>
      </section>

      {!state.isPossessed ? (
        <section className={styles.simulationSection}>
          <h3 className={styles.sectionTitle}>👻 시뮬레이션 트리거 (디버그)</h3>
          <div className={styles.triggerGrid}>
            <button className="btn btn-outline" onClick={() => triggerPossession('glitch')}>
              <MapPinOff size={16} /> 세이프존 이탈
            </button>
            <button className="btn btn-outline" onClick={() => triggerPossession('latency')}>
              <Smartphone size={16} /> 유튜브 타임 초과
            </button>
            <button className="btn btn-outline" onClick={() => triggerPossession('fake_call')}>
              <HeartPulse size={16} /> 누워있음 감지
            </button>
          </div>
        </section>
      ) : (
        <section className={`${styles.possessionActive} slide-up`}>
          <h2 className="glitch" data-text="경고: 딴짓 감지됨">경고: 딴짓 감지됨</h2>
          <p>즉시 학업으로 복귀하지 않으면 기기 제어권이 넘어갑니다.</p>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setShowSosModal(true)}>
            <Shield size={16} /> 긴급 퇴마 요청 (SOS)
          </button>
        </section>
      )}

      <section className={styles.curseSection}>
        <button className="btn btn-danger" onClick={simulateUninstall}>
          <Trash2 size={16} /> 앱 삭제 시도 (저주 발동)
        </button>
      </section>

      {/* Fake Call Modal */}
      {showFakeCall && (
        <div className="modal-overlay">
          <div className={`modal-content ${styles.fakeCallContent}`}>
            <div className={styles.callerAvatar}>교</div>
            <h2>교수님</h2>
            <p>휴대전화 010-XXXX-XXXX</p>
            <div className={styles.callActions}>
              <button className={styles.declineBtn} onClick={() => setShowFakeCall(false)}><PhoneOff size={24} /></button>
            </div>
          </div>
        </div>
      )}

      {/* SOS Modal */}
      {showSosModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginBottom: 12 }}>친구에게 퇴마 요청</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>
              엘리자베스에게 &apos;퇴마 승인&apos; 요청을 보냅니다. 엘리자베스가 진짜 급하다고 판단하여 수락하면 10분간 저주가 해제됩니다.
            </p>
            {sosStatus === 'idle' && (
              <button className="btn btn-primary" onClick={handleSosRequest}>요청 보내기</button>
            )}
            {sosStatus === 'waiting' && (
              <button className="btn btn-outline" disabled>엘리자베스의 응답 대기 중...</button>
            )}
            {sosStatus === 'approved' && (
              <button className="btn btn-success" style={{ background: 'var(--success)', color: '#fff' }}>퇴마 승인됨! 저주 해제 중...</button>
            )}
            <button className="btn btn-outline" style={{ marginTop: 8 }} onClick={() => setShowSosModal(false)}>취소</button>
          </div>
        </div>
      )}
    </main>
  );
}
