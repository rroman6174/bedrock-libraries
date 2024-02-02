import { Ticks, ticksToMinecraftTime } from './time';

describe('Ticks', () => {
  it('20 ticks in a second', () => {
    expect(new Ticks(1, 'seconds').getTicks()).toEqual(20);
  });
});

describe('ticksToMinecraftTime', () => {
  it('5:30', () => {
    expect(ticksToMinecraftTime(23500)).toEqual('5:30 AM');
  });
  it('6:00', () => {
    expect(ticksToMinecraftTime(0)).toEqual('6:00 AM');
  });
  it('Day', () => {
    expect(ticksToMinecraftTime(1000)).toEqual('7:00 AM');
  });
  it('7:15', () => {
    expect(ticksToMinecraftTime(1250)).toEqual('7:15 AM');
  });
  it('Noon', () => {
    expect(ticksToMinecraftTime(6000)).toEqual('12:00 PM');
  });
  it('12:30', () => {
    expect(ticksToMinecraftTime(6500)).toEqual('12:30 PM');
  });
  it('Night', () => {
    expect(ticksToMinecraftTime(13000)).toEqual('7:00 PM');
  });
  it('Midight', () => {
    expect(ticksToMinecraftTime(18000)).toEqual('12:00 AM');
  });
  it('12:05 AM', () => {
    expect(ticksToMinecraftTime(18090)).toEqual('12:05 AM');
  });
});

describe('ticksToMinecraftTime 24h', () => {
  it('5:30', () => {
    expect(ticksToMinecraftTime(23500, true)).toEqual('05:30');
  });
  it('6:00', () => {
    expect(ticksToMinecraftTime(0, true)).toEqual('06:00');
  });
  it('7:15', () => {
    expect(ticksToMinecraftTime(1250, true)).toEqual('07:15');
  });
  it('Noon', () => {
    expect(ticksToMinecraftTime(6000, true)).toEqual('12:00');
  });
  it('13:00', () => {
    expect(ticksToMinecraftTime(7000, true)).toEqual('13:00');
  });
  it('Midight', () => {
    expect(ticksToMinecraftTime(18000, true)).toEqual('00:00');
  });
  it('12:05 AM', () => {
    expect(ticksToMinecraftTime(18090, true)).toEqual('00:05');
  });
});
